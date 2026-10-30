# ==========================================
# Etapa 1: Dependencias
# ==========================================
FROM node:20-alpine AS dependencies
WORKDIR /app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar únicamente dependencias de producción de forma limpia
RUN npm ci --omit=dev --ignore-scripts=false

# ==========================================
# Etapa 2: Imagen Final de Producción
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=4001

# Crear estructura y asignar permisos a usuario node
RUN mkdir -p /app/files && chown -R node:node /app

# Copiar dependencias de producción desde la etapa de construcción
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
COPY --chown=node:node package*.json ./

# Copiar el código fuente, archivos estáticos y estructura de configuración etc
COPY --chown=node:node src ./src
COPY --chown=node:node files ./files
COPY --chown=node:node etc ./etc

# Cambiar a usuario sin privilegios root
USER node

# Exponer el puerto configurado
EXPOSE 4001

# Healthcheck nativo para verificar disponibilidad del backend
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-4001}/health || exit 1

# Ejecutar el servidor con flag --harmony tal como está en package.json
CMD ["node", "./src/server/index.js", "--harmony"]
