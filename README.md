# ✈ AVIOR Corporation SRL — Sitio Institucional & Sistema Académico

**Proyecto Integrador — Versión 2.0 (React + Docker + CI/CD)**

Rediseño profesional del sitio de la escuela de formación aeronáutica
**AVIOR Corporation S.R.L.**, construido con **React 18 + Vite**, empaquetado
como contenedor **Docker** (NGINX) y publicado automáticamente en **Docker Hub**
mediante **GitHub Actions**.

> Colores institucionales: **Guindo (#8B0000) · Negro (#0A0A0A) · Blanco (#FFFFFF)**

---

## 📁 Estructura del proyecto

```
avior-react/
├── .github/workflows/docker-publish.yml   # CI/CD → Docker Hub
├── src/
│   ├── components/                        # Navbar, Footer, Reveal, etc.
│   ├── context/AppContext.jsx             # Estado global (auth + datos)
│   ├── data/initialData.js                # Datos semilla del sistema
│   ├── pages/                             # Sitio público + Login
│   ├── pages/dashboard/                   # Sistema académico (3 roles)
│   ├── styles/                            # Design system CSS
│   └── utils/helpers.js
├── Dockerfile                             # Build multi-etapa (Node → NGINX)
├── nginx.conf                             # Servidor web + enrutamiento SPA
├── docker-compose.yml
└── package.json
```

## 🚀 Ejecución local (desarrollo)

```bash
npm install
npm run dev          # http://localhost:5173
```

## 🐳 Construir y ejecutar con Docker (local)

```bash
# Construir la imagen
docker build -t tinivalda/avior-web:latest .

# Ejecutar el contenedor en el puerto 80
docker run -d --name avior-web -p 80:80 tinivalda/avior-web:latest

# Verificar
docker ps
curl http://localhost/healthz
```

Con Docker Compose:

```bash
docker compose up -d --build
```

## 🔄 CI/CD con GitHub Actions → Docker Hub

1. Crear un repositorio en [Docker Hub](https://hub.docker.com) llamado **`avior-web`**.
2. En GitHub: **Settings → Secrets and variables → Actions → New repository secret**:

   | Nombre               | Valor                                        |
   |----------------------|----------------------------------------------|
   | `DOCKERHUB_USERNAME` | tu usuario de Docker Hub                     |
   | `DOCKERHUB_TOKEN`    | Personal Access Token (Write/Read) de Docker Hub |

3. Subir el proyecto y hacer push a `main`:

```bash
git init -b main
git add .
git commit -m "feat: AVIOR v2.0 — React + Docker + CI/CD"
git branch -M main
git remote add origin https://github.com/valecitaaaa12/avior-corporation.git
git push -u origin main
```

4. La acción **"Docker Build & Push a Docker Hub"** se dispara sola y publica
   `tinivalda/avior-web:latest` en Docker Hub.

## ☁️ Despliegue manual en VM de Oracle Cloud (OCI)

```bash
# 1. Conectarse a la VM (SSH)
ssh -i clave.pem ubuntu@<IP-PUBLICA>

# 2. Instalar Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker

# 3. Descargar la imagen desde Docker Hub
docker pull tinivalda/avior-web:latest

# 4. Desplegar la solución en el puerto 80
docker run -d --name avior-web -p 80:80 --restart unless-stopped tinivalda/avior-web:latest

# 5. Verificar
docker ps
curl http://localhost/healthz
```

Abrir el puerto **80** en la VCN de OCI (Security List → Ingress Rules) y acceder:

```
http://<IP-PUBLICA>
```

## 🔑 Usuarios de demostración (Aula Virtual)

| Rol        | Correo                    | Contraseña |
|------------|---------------------------|------------|
| Admin      | admin@avior.edu.bo        | admin123   |
| Instructor | cmamani@avior.edu.bo      | inst123    |
| Estudiante | acondori@avior.edu.bo     | est123     |

## 🏢 Institución

**AVIOR Corporation S.R.L.** — Centro de Instrucción de Aeronáutica Civil.
Certificado por la DGAC Bolivia · RAB 141 · RAB 142.
Sedes: La Paz · Cochabamba · Tarija · Sucre.
