# ============================================================
# AVIOR Corporation SRL — Imagen Docker (multi-stage build)
# Etapa 1: construir el bundle de React con Node
# Etapa 2: servir los archivos estáticos con NGINX
# ============================================================

# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Etapa 2: Producción (NGINX) ----------
FROM nginx:1.27-alpine AS production

# Configuración de NGINX para SPA (enrutamiento de React)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el build generado en la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Metadatos de la imagen
LABEL org.opencontainers.image.title="AVIOR Corporation SRL"
LABEL org.opencontainers.image.description="Sitio institucional y Sistema Académico AVIOR"
LABEL org.opencontainers.image.vendor="AVIOR Corporation SRL"

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
