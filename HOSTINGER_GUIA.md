# Guía de Despliegue en Hostinger (Solución a la Pantalla en Blanco)

## ¿Por qué se veía la pantalla en blanco?
En los servidores de Hostinger (hPanel), la herramienta **Git** solamente descarga los archivos fuente del repositorio en `public_html`.
**Hostinger no compila automáticamente React/TypeScript (`npm run build`).**
Por lo tanto, el navegador intentaba cargar el archivo `/src/main.tsx` en crudo, lo cual no es ejecutable por navegadores web estándar, dejando la pantalla completamente blanca.

---

## Solución 1: Subir la carpeta compilada `dist` (La más fácil, 2 minutos)

1. **Generar la versión de producción:**
   En tu proyecto (o tras exportar el ZIP desde AI Studio), ejecuta en la terminal:
   ```bash
   npm run build
   ```
   Esto creará la carpeta `dist/` con todos los archivos compilados en HTML, JS, CSS e imágenes, más el archivo `.htaccess`.

2. **Subir a Hostinger:**
   - Ingresa a tu panel de **Hostinger (hPanel)**.
   - Ve a **Sitios web** -> Administrar -> **Administrador de Archivos** (File Manager).
   - Abre la carpeta **`public_html`**.
   - Borra o limpia los archivos antiguos de desarrollo de `public_html` (como `src/`, `package.json`, etc.).
   - Sube **el contenido que está DENTRO de la carpeta `dist/`** directamente a `public_html`:
     - `assets/` (carpeta)
     - `index.html`
     - `.htaccess`
     - `image.png`
   *(Consejo: puedes comprimir el contenido de `dist/` en un archivo `.zip`, subirlo a `public_html` y hacer clic derecho -> "Extraer").*

3. **¡Listo!** Abre tu dominio y el sitio cargará instantáneamente.

---

## Solución 2: Despliegue automático desde GitHub con GitHub Actions

Si quieres que cada vez que hagas `git push` a tu repositorio de GitHub se compile y se actualice solo en Hostinger sin subir nada manual:

1. Ya dejamos configurado el flujo en `.github/workflows/deploy.yml`.
2. En tu panel de Hostinger, busca **Cuentas FTP** y anota:
   - Host FTP (ej: `ftp.tudominio.com` o la IP del servidor)
   - Usuario FTP
   - Contraseña FTP
3. En tu repositorio de GitHub, ve a **Settings** -> **Secrets and variables** -> **Actions** y añade estos 3 secretos:
   - `FTP_SERVER`: tu servidor FTP de Hostinger.
   - `FTP_USERNAME`: tu usuario FTP de Hostinger.
   - `FTP_PASSWORD`: tu contraseña FTP.
   *(Opcional: Si usas Supabase, agrega también `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`).*
4. Cada vez que hagas `push` a `main`, GitHub compilará el proyecto y subirá la carpeta `dist` directamente a `public_html` en Hostinger.
