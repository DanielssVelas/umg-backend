# Guía de Despliegue en Azure VPS (Ubuntu 24.04 LTS)

Esta guía explica paso a paso cómo desplegar el backend de **umg-backend** en una máquina virtual de Azure con **Ubuntu 24.04 LTS** usando Docker y Docker Compose.

---

## 1. Configuración de Red en Azure (Network Security Group - NSG)

Antes de conectarte a tu máquina virtual en Azure, asegúrate de habilitar los puertos necesarios en el firewall de Azure:

1. Ve a [Azure Portal](https://portal.azure.com).
2. Entra a tu **Máquina Virtual** > Menú lateral izquierdo > **Networking** (Redes) > **Network Security Group** (Grupo de seguridad de red).
3. En **Inbound port rules** (Reglas de puerto de entrada), añade una regla:
   - **Source**: `Any` (o tu IP)
   - **Source port ranges**: `*`
   - **Destination**: `Any`
   - **Service**: Custom
   - **Destination port ranges**: `4001` (o `80, 443, 4001` si usarás Nginx y SSL)
   - **Protocol**: `TCP`
   - **Action**: `Allow`
   - **Priority**: `1010`
   - **Name**: `Allow-Backend-4001`
4. Guarda los cambios.

---

## 2. Conexión SSH a la Máquina Virtual

Conéctate desde tu terminal a tu VPS en Azure:

```bash
ssh tu_usuario@IP_PUBLICA_AZURE
```

---

## 3. Instalación de Docker y Docker Compose en Ubuntu 24.04 LTS

Ejecuta los siguientes comandos en tu servidor Ubuntu 24.04 para instalar Docker de manera oficial y limpia:

```bash
# 1. Actualizar el sistema e instalar dependencias básicas
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg lsb-release git

# 2. Agregar la clave GPG oficial de Docker
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 3. Agregar el repositorio oficial de Docker para Ubuntu 24.04
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Instalar Docker Engine y el plugin Docker Compose
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 5. Permitir usar docker sin sudo (opcional pero recomendado)
sudo usermod -aG docker $USER
newgrp docker

# 6. Validar instalación
docker --version
docker compose version
```

---

## 4. Clonar el Proyecto y Configurar Ambientes

### 4.1 Clonar el repositorio y cambiar a la rama `docker/dvelas`:

```bash
# Clonar el proyecto
git clone https://github.com/DanielssVelas/umg-backend.git
cd umg-backend

# Cambiar a la rama con la configuración de Docker
git checkout docker/dvelas
```

### 4.2 Configurar el archivo de Variables de Entorno y Secretos (`etc/main` o `etc/dev`)

Tu proyecto ahora cuenta con la estructura estándar de ambientes en la carpeta `etc/`:
- **`etc/main/`**: Ambiente de Producción (VPS en Azure)
- **`etc/dev/`**: Ambiente de Desarrollo Local

Para tu servidor en Azure (**ambiente `main`**), copia la plantilla `.env.example` de `etc/main`:

```bash
# Crear el archivo de variables para producción en Azure
cp etc/main/.env.example etc/main/.env
nano etc/main/.env
```

*(Opcional: Si manejas secretos en formato YAML, también tienes la plantilla en `etc/main/secrets.example.yml` para copiar a `etc/main/secrets.yml`)*

Edita `etc/main/.env` con los valores de tu servidor en Azure:

```dotenv
PORT=4001
NODE_ENV=production
TIMEOUT=90s
ENABLE_LOG_FILE=false

JWT_SECRET=tu_clave_secreta_jwt_de_produccion_azure

# Credenciales de Base de Datos Oracle:
ORACLE_USER=LAB1
ORACLE_PASSWORD=tu_password_segura
# IMPORTANTE:
# - Si Oracle está en otro servidor/VPS: IP_ORACLE:1521/ORCLPDB
# - Si Oracle está en el mismo VPS en Docker: usa el nombre del contenedor o la IP privada del VPS
ORACLE_CONNECT_STRING=IP_DEL_SERVIDOR_ORACLE:1521/ORCLPDB

ORACLE_POOL_MIN=1
ORACLE_POOL_MAX=10
ORACLE_POOL_INCREMENT=1
ORACLE_POOL_TIMEOUT=60
ORACLE_CALL_TIMEOUT=30000
```

> Para guardar en `nano`: presiona `Ctrl + O`, luego `Enter`, y sal con `Ctrl + X`.

---

## 5. Levantar el Backend con Docker Compose

Construye la imagen e inicia el contenedor en segundo plano:

```bash
# Construir y levantar
docker compose up -d --build
```

### Comandos de Monitoreo y Mantenimiento:

- **Ver logs en tiempo real**:
  ```bash
  docker compose logs -f
  ```
- **Verificar estado del contenedor y healthcheck**:
  ```bash
  docker compose ps
  ```
- **Probar el endpoint de Healthcheck**:
  ```bash
  curl http://localhost:4001/health
  ```
  *Respuesta esperada:* `{"status":"ok","uptime":...}`

- **Reiniciar el contenedor**:
  ```bash
  docker compose restart
  ```
- **Detener el servicio**:
  ```bash
  docker compose down
  ```
- **Actualizar cambios después de un git pull**:
  ```bash
  git pull origin docker/dvelas
  docker compose up -d --build
  ```

---

## 6. (Opcional) Configurar Nginx como Reverse Proxy y Dominio con SSL (HTTPS)

Si tienes un dominio apuntando a la IP de Azure y deseas exponer el backend en el puerto estándar 80/443 con HTTPS gratuito:

```bash
# 1. Instalar Nginx y Certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# 2. Configurar el proxy inverso
sudo nano /etc/nginx/sites-available/backend.conf
```

Pega la siguiente configuración:

```nginx
server {
    listen 80;
    server_name api.tudominio.com; # o la IP pública de Azure

    location / {
        proxy_pass http://127.0.0.1:4001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilita el sitio y reinicia Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/backend.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Obtener certificado SSL con Let's Encrypt:

```bash
sudo certbot --nginx -d api.tudominio.com
```
