# ============================================================
# Genera el documento Word editable del Proyecto Integrador
# AVIOR CORPORATION SRL — Docker + GitHub Actions + OCI
# Requiere Microsoft Word instalado (automatización COM).
# ============================================================

$ErrorActionPreference = 'Stop'

$GUINDO = 139                       # RGB(139,0,0)
$GRIS_CLARO = 15790320              # RGB(240,240,240)
$GRIS_TINTA = 11184810              # RGB(166,166,166)
$ROJO_ALERTA = 255                  # RGB(255,0,0) en BGR -> valor 255 equivale a azul; usar 192 = rojo BGR(0,0,192)
$outPath = "C:\Users\HP\Downloads\Proyecto Integrador - AVIOR Docker OCI.docx"

Write-Host "Iniciando Microsoft Word..."
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$doc = $word.Documents.Add()
$sel = $word.Selection

# ---------------- Estilos base ----------------
$normal = $doc.Styles.Item(-1)      # wdStyleNormal
$normal.Font.Name = 'Calibri'
$normal.Font.Size = 11
$normal.Font.Color = 0
$normal.ParagraphFormat.SpaceAfter = 6

# ---------------- Helpers ----------------
function Go-End { $sel.EndKey(6) | Out-Null }   # wdStory = fin del documento

function Add-Title($t) {
    Go-End
    $sel.Style = $doc.Styles.Item(-63)   # wdStyleTitle
    $sel.Font.Name = 'Calibri'
    $sel.Font.Size = 30
    $sel.Font.Bold = $true
    $sel.Font.Color = $GUINDO
    $sel.ParagraphFormat.Alignment = 1
    $sel.TypeText($t)
    $sel.TypeParagraph()
    $sel.Font.Reset()
    $sel.ParagraphFormat.Alignment = 0
}

function Add-Sub($t) {
    Go-End
    $sel.Style = $doc.Styles.Item(-1)
    $sel.Font.Size = 14
    $sel.Font.Bold = $true
    $sel.Font.Color = $GRIS_TINTA
    $sel.ParagraphFormat.Alignment = 1
    $sel.TypeText($t)
    $sel.TypeParagraph()
    $sel.TypeParagraph()
    $sel.Font.Reset()
    $sel.ParagraphFormat.Alignment = 0
}

function Add-H1($t) {
    Go-End
    $sel.Style = $doc.Styles.Item(-2)   # wdStyleHeading1
    $sel.Font.Name = 'Calibri'
    $sel.Font.Size = 17
    $sel.Font.Bold = $true
    $sel.Font.Color = $GUINDO
    $sel.TypeText($t)
    $sel.TypeParagraph()
    $sel.Font.Reset()
}

function Add-H2($t) {
    Go-End
    $sel.Style = $doc.Styles.Item(-3)   # wdStyleHeading2
    $sel.Font.Name = 'Calibri'
    $sel.Font.Size = 13
    $sel.Font.Bold = $true
    $sel.Font.Color = 0
    $sel.TypeText($t)
    $sel.TypeParagraph()
    $sel.Font.Reset()
}

function Add-P($t) {
    Go-End
    $sel.Style = $doc.Styles.Item(-1)
    $sel.TypeText($t)
    $sel.TypeParagraph()
}

function Add-B($t) {                     # viñeta
    Go-End
    $sel.Style = $doc.Styles.Item(-48)   # wdStyleListBullet
    $sel.TypeText($t)
    $sel.TypeParagraph()
}

function Add-Code($t) {                  # bloque de código monoespaciado con fondo gris
    Go-End
    $sel.Style = $doc.Styles.Item(-1)
    $sel.Font.Name = 'Consolas'
    $sel.Font.Size = 9
    $sel.Font.Color = 6579300            # RGB(51,51,51)
    $sel.ParagraphFormat.Shading.BackgroundPatternColor = $GRIS_CLARO
    $sel.ParagraphFormat.LeftIndent = 10
    ($t -split "`n") | ForEach-Object {
        $sel.TypeText($_)
        $sel.TypeParagraph()
    }
    $sel.ParagraphFormat.Shading.BackgroundPatternColor = 16777215
    $sel.ParagraphFormat.LeftIndent = 0
    $sel.Font.Reset()
    $sel.TypeParagraph()
}

function Add-Table($headers, $rows) {
    Go-End
    $rango = $sel.Range
    $tabla = $doc.Tables.Add($rango, $rows.Count + 1, $headers.Count)
    $tabla.Borders.Enable = 1
    $tabla.Range.Font.Size = 9.5
    for ($c = 0; $c -lt $headers.Count; $c++) {
        $tabla.Cell(1, $c + 1).Range.Text = $headers[$c]
        $tabla.Cell(1, $c + 1).Range.Font.Bold = $true
        $tabla.Cell(1, $c + 1).Range.Font.Color = 16777215
        $tabla.Cell(1, $c + 1).Shading.BackgroundPatternColor = $GUINDO
    }
    for ($r = 0; $r -lt $rows.Count; $r++) {
        for ($c = 0; $c -lt $headers.Count; $c++) {
            $tabla.Cell($r + 2, $c + 1).Range.Text = [string]$rows[$r][$c]
        }
        if ($r % 2 -eq 1) { $tabla.Rows.Item($r + 2).Shading.BackgroundPatternColor = $GRIS_CLARO }
    }
    $tabla.Columns.Autofit() | Out-Null
    Go-End
    $sel.TypeParagraph()
}

function Add-Fig($num, $desc) {          # recuadro para pegar captura
    Go-End
    $rango = $sel.Range
    $tabla = $doc.Tables.Add($rango, 1, 1)
    $tabla.Borders.Enable = 1
    $tabla.Borders.OutsideColor = $GUINDO
    $tabla.Rows.Item(1).Height = 200
    $tabla.Cell(1, 1).VerticalAlignment = 1
    $tabla.Cell(1, 1).Shading.BackgroundPatternColor = 16119285   # tinte guindo muy claro
    $tabla.Range.ParagraphFormat.Alignment = 1
    $tabla.Cell(1, 1).Range.Font.Color = $GRIS_TINTA
    $tabla.Cell(1, 1).Range.Font.Italic = $true
    $tabla.Cell(1, 1).Range.Font.Size = 10.5
    $tabla.Cell(1, 1).Range.Text = "[ PEGAR CAPTURA AQUÍ ]`nFigura $num - $desc"
    Go-End
    $sel.TypeParagraph()
}

# ============================================================
#                       CONTENIDO
# ============================================================

Add-Title 'PROYECTO INTEGRADOR'
Add-Sub 'Despliegue de una solucion contenedorizada con Docker, CI/CD en GitHub Actions y Oracle Cloud Infrastructure'
Add-Sub 'AVIOR CORPORATION S.R.L.  |  Escuela de Formacion Aeronautica  |  Sistema web en React'

$sel.ParagraphFormat.Alignment = 1
Add-P 'Institucion: AVIOR CORPORATION S.R.L. (guindo, negro y blanco)'
Add-P 'Materia / Docente: ______________________________     Estudiante: ______________________________'
Add-P 'Fecha de entrega: ____ / ____ / 2026'
$sel.ParagraphFormat.Alignment = 0

Add-P ''

# ------------------------------------------------------------
Add-H1 '1. Resumen ejecutivo'
Add-P 'El presente documento describe el despliegue completo del Sistema Web de AVIOR CORPORATION S.R.L., proyecto que fue mejorado y migrado a React 18 + Vite, empaquetado como imagen Docker (build multi-etapa con NGINX), publicado automaticamente en Docker Hub mediante GitHub Actions y desplegado manualmente en una maquina virtual de Oracle Cloud Infrastructure (OCI), quedando disponible en la IP publica de la instancia.'
Add-P 'Paleta institucional aplicada en toda la interfaz: Guindo #8B0000, Negro #0A0A0A y Blanco #FFFFFF, con un design system propio (tipografia, tarjetas, animaciones reveal y paneles oscuros) que le da un acabado corporativo y profesional.'

# ------------------------------------------------------------
Add-H1 '2. Descripcion de la tarea'
Add-H2 '2.1 Requerimientos'
Add-B 'Crear un contenedor de la solucion del Proyecto Integrador.'
Add-B 'Cargar el proyecto a Docker Hub utilizando GitHub Actions (CI/CD).'
Add-B 'Desplegar manualmente una VM en Oracle Cloud Infrastructure (OCI).'
Add-B 'Descargar el contenedor de la solucion manualmente en la VM configurada y mostrar la solucion en su IP publica.'
Add-H2 '2.2 Detalles a evaluar'
Add-B 'El Docker ejecutado en Docker Desktop (imagenes adjuntas).'
Add-B 'El trabajo de GitHub Actions al hacer push a la rama main y la publicacion en Docker Hub (evidencia fotografica).'
Add-B 'Creacion de la VM (capturas de pantalla de la terminal).'
Add-B 'Ejecucion de los comandos Docker para desplegar la solucion en la VM (IP publica, capturas de pantalla).'

# ------------------------------------------------------------
Add-H1 '3. Mejora del proyecto: migracion a React'
Add-P 'El sitio original (HTML + CSS + JavaScript) fue rediseñado por completo como una aplicacion moderna de una sola pagina (SPA) construida con React 18 y Vite, manteniendo todo el contenido institucional y el Sistema Academico de 3 roles con persistencia en localStorage.'
Add-Table @('Aspecto', 'Antes (v1)', 'Ahora (v2 - React)') @(
    @('Arquitectura', 'HTML estatico multipagina', 'SPA con React 18 + React Router'),
    @('Herramientas', 'Edicion manual de archivos', 'Vite, JSX modular y build optimizado'),
    @('Estado / datos', 'Variables globales JS', 'Context API centralizado (DataProvider)'),
    @('Sistema Academico', 'dashboard.js con modulos incompletos', '17 modulos completos para admin, instructor y estudiante'),
    @('Diseno', 'Basico', 'Design system corporativo guindo/negro/blanco con animaciones'),
    @('Despliegue', 'Archivos sueltos', 'Imagen Docker + NGINX + CI/CD automatico')
)

Add-H2 '3.1 Stack tecnologico'
Add-B 'React 18 + Vite 5 (build rapido) y React Router 6 (enrutamiento).'
Add-B 'CSS propio (design system) sin dependencias externas pesadas.'
Add-B 'Sistema Academico: estudiantes, instructores, cursos, inscripciones, calificaciones, asistencia con pasar lista, tareas/entregas, reportes y anuncios.'
Add-B 'NGINX como servidor de produccion con enrutamiento SPA y endpoint /healthz.'

Add-H2 '3.2 Estructura del proyecto'
Add-Code @'
avior-react/
|-- .github/workflows/docker-publish.yml   # CI/CD hacia Docker Hub
|-- src/
|   |-- components/                        # Navbar, Footer, iconos SVG, Reveal
|   |-- context/AppContext.jsx             # Estado global: auth + datos
|   |-- data/initialData.js                # Datos semilla (usuarios, cursos, etc.)
|   |-- pages/                             # Inicio, Carreras, Nosotros, Sedes, Contacto, Login
|   |-- pages/dashboard/                   # Sistema Academico (3 roles)
|   |-- styles/                            # global.css, public.css, dashboard.css
|   `-- utils/helpers.js
|-- Dockerfile                             # Build multi-etapa: Node -> NGINX
|-- nginx.conf                             # Servidor web + SPA routing
|-- docker-compose.yml
`-- package.json
'@

Add-H2 '3.3 Cuentas de demostracion (Aula Virtual)'
Add-Table @('Rol', 'Correo', 'Contrasena') @(
    @('Administrador', 'admin@avior.edu.bo', 'admin123'),
    @('Instructor', 'cmamani@avior.edu.bo', 'inst123'),
    @('Estudiante', 'acondori@avior.edu.bo', 'est123')
)

Add-H2 '3.4 Evidencia del sitio mejorado'
Add-Fig 1 'Sitio institucional AVIOR en React (pagina de inicio)'
Add-Fig 2 'Sistema Academico (dashboard) con los 3 roles'

# ------------------------------------------------------------
Add-H1 '4. Creacion del contenedor de Docker (Docker Desktop)'
Add-P 'La imagen se construye en dos etapas (multi-stage): primero Node 20 compila el bundle de React y luego NGINX 1.27 sirve los archivos estaticos de forma optimizada. La construccion y ejecucion se realizaron en Docker Desktop.'

Add-H2 '4.1 Archivo Dockerfile'
Add-Code @'
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]
'@

Add-H2 '4.2 Comandos ejecutados en la terminal (PowerShell)'
Add-Code @'
# Construir la imagen
docker build -t tinivalda/avior-web:latest .

# Ejecutar el contenedor publicando el puerto 80
docker run -d --name avior-web -p 80:80 --restart unless-stopped tinivalda/avior-web:latest

# Verificar que el contenedor este corriendo
docker ps

# Verificar el endpoint de salud
curl http://localhost/healthz
'@

Add-H2 '4.3 Salida esperada'
Add-Code @'
CONTAINER ID   IMAGE                        STATUS                   PORTS
e1b3c0f8cacc   tinivalda/avior-web:latest   Up 2 minutes (healthy)   0.0.0.0:80->80/tcp

$ curl http://localhost/healthz
OK
'@

Add-H2 '4.4 Evidencia fotografica'
Add-Fig 3 'Docker Desktop con la imagen tinivalda/avior-web:latest construida'
Add-Fig 4 'Contenedor avior-web corriendo y sitio accesible en http://localhost'

# ------------------------------------------------------------
Add-H1 '5. Publicacion automatica en Docker Hub con GitHub Actions'
Add-P 'Se configuro un workflow que se ejecuta automaticamente en cada push a la rama main: construye la imagen y la publica en Docker Hub con las etiquetas latest, sha y fecha.'

Add-H2 '5.1 Pasos previos en Docker Hub y GitHub'
Add-B 'Crear un repositorio publico llamado avior-web en https://hub.docker.com.'
Add-B 'En GitHub: Settings > Secrets and variables > Actions > New repository secret.'
Add-Table @('Secreto (nombre)', 'Valor') @(
    @('DOCKERHUB_USERNAME', 'Tu usuario de Docker Hub (ej: tinivalda)'),
    @('DOCKERHUB_TOKEN', 'Personal Access Token con permisos Read/Write de Docker Hub')
)

Add-H2 '5.2 Archivo del workflow (.github/workflows/docker-publish.yml)'
Add-Code @'
name: Docker Build & Push a Docker Hub
on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout del codigo
        uses: actions/checkout@v4
      - name: Configurar Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Login en Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Generar etiquetas
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ secrets.DOCKERHUB_USERNAME }}/avior-web
      - name: Build y push de la imagen
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
'@

Add-H2 '5.3 Comandos para subir el proyecto a GitHub'
Add-Code @'
git init -b main
git add .
git commit -m "feat: AVIOR v2.0 - React + Docker + CI/CD"
git remote add origin https://github.com/valecitaaaa12/avior-corporation.git
git push -u origin main
'@

Add-H2 '5.4 Evidencia fotografica'
Add-Fig 5 'GitHub Actions: workflow "Docker Build & Push a Docker Hub" ejecutandose con exito (verde)'
Add-Fig 6 'Imagen publicada en Docker Hub: tinivalda/avior-web:latest'

# ------------------------------------------------------------
Add-H1 '6. Creacion manual de la VM en Oracle Cloud (OCI)'
Add-P 'Se despliego una instancia compute manualmente desde la consola de Oracle Cloud con sistema operativo Ubuntu y plano Always Free (VM.Standard.E2.1.Micro o equivalente).'

Add-H2 '6.1 Pasos en la consola de OCI'
Add-B 'Inicio > Compute > Instances > Create Instance.'
Add-B 'Nombre: avior-vm. Imagen: Canonical Ubuntu 22.04 (o 24.04) aarch64/amd64.'
Add-B 'Plano (shape): VM.Standard.E2.1.Micro ( Always Free ) o el disponible de la cuenta.'
Add-B 'Clave SSH: subir o generar el par de claves (se descarga el archivo .key/.pem).'
Add-B 'Networking: VCN con Security List que permita ingress TCP 22 (SSH) y TCP 80 (HTTP) desde 0.0.0.0/0.'
Add-B 'Create Instance y esperar el estado RUNNING con IP publica asignada.'

Add-H2 '6.2 Conexión a la VM desde la terminal'
Add-Code @'
# Windows (PowerShell) - conectarse por SSH
ssh -i avior-key.key ubuntu@<IP-PUBLICA>

# Verificar sistema y recursos
hostnamectl
df -h
'@

Add-H2 '6.3 Evidencia fotografica'
Add-Fig 7 'Consola OCI: formulario de creacion de la instancia (nombre, imagen, plano y clave SSH)'
Add-Fig 8 'Instancia en estado RUNNING con su IP publica visible'

# ------------------------------------------------------------
Add-H1 '7. Despliegue manual de la solucion en la VM'
Add-P 'Una vez dentro de la VM por SSH, se instalo Docker, se descargo la imagen publicada en Docker Hub y se ejecuto el contenedor en el puerto 80.'

Add-H2 '7.1 Comandos ejecutados en la terminal de la VM'
Add-Code @'
# 1) Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# 2) Instalar Docker Engine
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker

# 3) Verificar la instalacion
docker --version
docker run hello-world

# 4) Descargar la imagen de la solucion desde Docker Hub
docker pull tinivalda/avior-web:latest

# 5) Desplegar la solucion en el puerto 80
docker run -d --name avior-web -p 80:80 --restart unless-stopped tinivalda/avior-web:latest

# 6) Verificar el despliegue
docker ps
curl http://localhost/healthz
'@

Add-H2 '7.2 Salida esperada'
Add-Code @'
$ docker pull tinivalda/avior-web:latest
latest: Pulling from tinivalda/avior-web
Digest: sha256:23edc008e916...
Status: Downloaded newer image

$ docker ps
CONTAINER ID   IMAGE                                STATUS        PORTS
a91f...        tinivalda/avior-web:latest      Up (healthy)  0.0.0.0:80->80/tcp

$ curl http://localhost/healthz
OK
'@

Add-H2 '7.3 Evidencia fotografica'
Add-Fig 9 'Terminal de la VM: instalacion de Docker y docker pull de la imagen'
Add-Fig 10 'docker ps en la VM y sitio publicado en la IP publica'

# ------------------------------------------------------------
Add-H1 '8. Verificacion de la solucion en la IP publica'
Add-P 'Con el contenedor en ejecucion y el puerto 80 habilitado en la Security List de OCI, la solucion queda disponible en el navegador desde cualquier equipo:'
Add-Code @'
http://<IP-PUBLICA>          -> Sitio institucional AVIOR
http://<IP-PUBLICA>/login    -> Aula Virtual (Sistema Academico)
http://<IP-PUBLICA>/healthz  -> Endpoint de salud (OK)
'@
Add-Fig 11 'Navegador accediendo a la solucion mediante la IP publica de la VM'

# ------------------------------------------------------------
Add-H1 '9. Tabla resumen de comandos'
Add-Table @('Fase', 'Comando clave', 'Objetivo') @(
    @('Build local', 'docker build -t usuario/avior-web:latest .', 'Generar la imagen Docker'),
    @('Ejecucion local', 'docker run -d -p 80:80 --name avior-web usuario/avior-web', 'Levantar el contenedor'),
    @('CI/CD', 'git push -u origin main', 'Disparar GitHub Actions hacia Docker Hub'),
    @('VM - Docker', 'curl -fsSL https://get.docker.com | sudo sh', 'Instalar Docker en la VM'),
    @('VM - Descarga', 'docker pull usuario/avior-web:latest', 'Bajar la imagen en la VM'),
    @('VM - Despliegue', 'docker run -d -p 80:80 --restart unless-stopped usuario/avior-web', 'Publicar la solucion en la IP publica')
)

# ------------------------------------------------------------
Add-H1 '10. Conclusiones'
Add-B 'La solucion de AVIOR CORPORATION S.R.L. fue mejorada y migrada a React, logrando una interfaz profesional con los colores institucionales (guindo, negro y blanco).'
Add-B 'El build multi-etapa (Node + NGINX) produce una imagen Docker ligera, reproducible y con healthcheck integrado.'
Add-B 'GitHub Actions automatiza la publicacion en Docker Hub en cada push a main, eliminando pasos manuales del flujo de despliegue.'
Add-B 'La VM de OCI ejecuta la solucion con un solo comando docker run y queda disponible en su IP publica, demostrando el ciclo completo: Codigo > CI/CD > Registro > Nube.'

# ------------------------------------------------------------
Add-H1 '11. Referencias'
Add-B 'Docker Documentation: https://docs.docker.com'
Add-B 'GitHub Actions Documentation: https://docs.github.com/actions'
Add-B 'Oracle Cloud Infrastructure: https://www.oracle.com/cloud/'
Add-B 'React Documentation: https://react.dev'
Add-B 'Repositorio del proyecto: https://github.com/valecitaaaa12/avior-corporation'

# ---------------- Footer ----------------
$footer = $doc.Sections.Item(1).Footers.Item(1).Range
$footer.Text = 'AVIOR CORPORATION S.R.L. - Proyecto Integrador - Despliegue con Docker, GitHub Actions y OCI'
$footer.Font.Size = 8
$footer.Font.Color = $GRIS_TINTA
$footer.ParagraphFormat.Alignment = 1

Write-Host "Guardando documento en: $outPath"
$doc.SaveAs2($outPath, 16)   # 16 = wdFormatXMLDocument (.docx)
$doc.Close()
$word.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
Write-Host "Documento generado correctamente."

