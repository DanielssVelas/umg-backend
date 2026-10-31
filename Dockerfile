
# Imagen base de Node.js
FROM node:24-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar únicamente dependencias de producción
RUN npm ci --omit=dev

# Copiar el código del backend
COPY . .

# Puerto del backend
EXPOSE 4001

# Ejecutar aplicación
CMD ["npm", "start"]
