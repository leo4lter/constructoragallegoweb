import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';
import { supabase } from '@/lib/supabase';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  HardHat,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export default function BrandingSettings() {
  const { siteSettings, updateSiteSettings } = useData();

  const [logoUrl, setLogoUrl] = useState(siteSettings.logo_url || '');
  const [iconUrl, setIconUrl] = useState(siteSettings.icon_url || '');
  const [siteTitle, setSiteTitle] = useState(siteSettings.site_title || 'Constructora El Gallego');

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Helper to convert a file to a permanent data URL or upload to Supabase storage if available
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'icon'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('El archivo no debe superar los 5MB.');
      return;
    }

    if (type === 'logo') setUploadingLogo(true);
    else setUploadingIcon(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Try uploading to Supabase storage 'branding' bucket if configured
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}_${Date.now()}.${fileExt}`;
      const filePath = `site/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('branding')
        .upload(filePath, file, { upsert: true });

      if (!storageError) {
        const { data: publicUrlData } = supabase.storage
          .from('branding')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl && !publicUrlData.publicUrl.includes('placeholder')) {
          if (type === 'logo') setLogoUrl(publicUrlData.publicUrl);
          else setIconUrl(publicUrlData.publicUrl);
          if (type === 'logo') setUploadingLogo(false);
          else setUploadingIcon(false);
          return;
        }
      }

      // 2. High-fidelity direct data URL encoding (persists directly in the database row)
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'logo') {
          setLogoUrl(result);
          setUploadingLogo(false);
        } else {
          setIconUrl(result);
          setUploadingIcon(false);
        }
      };
      reader.onerror = () => {
        setErrorMsg('Error al leer el archivo de imagen.');
        if (type === 'logo') setUploadingLogo(false);
        else setUploadingIcon(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al procesar la imagen');
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingIcon(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await updateSiteSettings({
        logo_url: logoUrl.trim(),
        icon_url: iconUrl.trim(),
        site_title: siteTitle.trim() || 'Constructora El Gallego',
      });
      setSuccessMsg('¡Identidad visual actualizada y guardada en el servidor con éxito!');
      setTimeout(() => setSuccessMsg(''), 4500);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm('¿Deseas restablecer el logo e ícono predeterminados?')) return;
    setLogoUrl('');
    setIconUrl('');
    setSiteTitle('Constructora El Gallego');
    setSaving(true);
    try {
      await updateSiteSettings({
        logo_url: '',
        icon_url: '',
        site_title: 'Constructora El Gallego',
      });
      setSuccessMsg('Se restableció la configuración predeterminada.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al restablecer');
    } finally {
      setSaving(false);
    }
  };

  // Quick helper to use the bundled image if present
  const handleUseBundledLogo = () => {
    setLogoUrl('/image.png');
  };

  const handleUseBundledIcon = () => {
    setIconUrl('/image.png');
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal-900">
          Identidad Visual & Marca
        </h1>
        <p className="text-charcoal-500 mt-1">
          Personaliza el logotipo principal de la cabecera y el ícono de pestaña (favicon) de la web.
          Todos los cambios se almacenan en el servidor para que todos los visitantes lo vean.
        </p>
      </div>

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm font-medium"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </motion.div>
      )}

      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-sm font-medium"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* LOGO SECTION */}
        <div className="admin-card p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-charcoal-100 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-charcoal-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-terracotta-500" />
                Logotipo Principal del Sitio
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
                Se muestra en la barra de navegación superior (desktop y mobile) y en el pie de página.
              </p>
            </div>
            {logoUrl && (
              <button
                type="button"
                onClick={() => setLogoUrl('')}
                className="text-xs text-charcoal-400 hover:text-red-500 transition-colors"
              >
                Quitar logo
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                Subir Imagen de Logo
              </label>
              <div className="border-2 border-dashed border-charcoal-200 hover:border-terracotta-400 transition-colors p-6 text-center bg-charcoal-50/50 relative">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploadingLogo}
                />
                <div className="flex flex-col items-center pointer-events-none">
                  <Upload className="w-8 h-8 text-charcoal-400 mb-2" />
                  <p className="text-sm font-medium text-charcoal-700">
                    {uploadingLogo ? 'Cargando imagen...' : 'Haz clic o arrastra una imagen'}
                  </p>
                  <p className="text-xs text-charcoal-400 mt-1">PNG, JPG, SVG o WebP (máx. 5MB)</p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-charcoal-600 mb-1">
                  O introduce una URL de imagen directa:
                </label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://ejemplo.com/logo.png o /image.png"
                  className="w-full text-xs p-2.5 border border-charcoal-200 focus:border-terracotta-500 focus:outline-none bg-white"
                />
                <button
                  type="button"
                  onClick={handleUseBundledLogo}
                  className="inline-flex items-center gap-1.5 text-xs text-terracotta-600 hover:text-terracotta-700 font-medium mt-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Usar logo oficial cargado en el proyecto (/image.png)
                </button>
              </div>
            </div>

            {/* PREVIEW */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                Vista Previa en Barra de Navegación
              </label>
              <div className="space-y-4">
                {/* Dark preview */}
                <div className="bg-charcoal-900 p-5 border border-charcoal-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Preview Logo"
                        className="h-10 w-auto max-w-[200px] object-contain"
                        onError={() => setErrorMsg('No se pudo cargar la imagen del logo desde la URL especificada.')}
                      />
                    ) : (
                      <>
                        <HardHat className="w-7 h-7 text-white" strokeWidth={1.5} />
                        <span className="font-display font-bold text-white text-base">
                          {siteTitle}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-charcoal-400 font-mono">
                    Cabecera inicio
                  </span>
                </div>

                {/* Light preview */}
                <div className="bg-white p-5 border border-charcoal-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Preview Logo"
                        className="h-9 w-auto max-w-[180px] object-contain"
                      />
                    ) : (
                      <>
                        <HardHat className="w-7 h-7 text-terracotta-500" strokeWidth={1.5} />
                        <span className="font-display font-bold text-charcoal-800 text-base">
                          {siteTitle}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-charcoal-400 font-mono">
                    Cabecera al scrollear
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAVICON / ICON SECTION */}
        <div className="admin-card p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-charcoal-100 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-charcoal-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-terracotta-500" />
                Ícono de la Web (Favicon de Pestaña)
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
                El ícono que los visitantes ven en la pestaña del navegador, marcadores y accesos directos.
              </p>
            </div>
            {iconUrl && (
              <button
                type="button"
                onClick={() => setIconUrl('')}
                className="text-xs text-charcoal-400 hover:text-red-500 transition-colors"
              >
                Quitar favicon
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                Subir Ícono / Favicon
              </label>
              <div className="border-2 border-dashed border-charcoal-200 hover:border-terracotta-400 transition-colors p-6 text-center bg-charcoal-50/50 relative">
                <input
                  type="file"
                  accept="image/png,image/x-icon,image/svg+xml,image/jpeg"
                  onChange={(e) => handleFileChange(e, 'icon')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploadingIcon}
                />
                <div className="flex flex-col items-center pointer-events-none">
                  <Upload className="w-8 h-8 text-charcoal-400 mb-2" />
                  <p className="text-sm font-medium text-charcoal-700">
                    {uploadingIcon ? 'Cargando ícono...' : 'Haz clic o arrastra un ícono cuadrado'}
                  </p>
                  <p className="text-xs text-charcoal-400 mt-1">PNG, ICO o SVG (Recomendado: 64x64 o 128x128 px)</p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-charcoal-600 mb-1">
                  O introduce una URL de favicon directa:
                </label>
                <input
                  type="text"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  placeholder="https://ejemplo.com/favicon.png o /image.png"
                  className="w-full text-xs p-2.5 border border-charcoal-200 focus:border-terracotta-500 focus:outline-none bg-white"
                />
                <button
                  type="button"
                  onClick={handleUseBundledIcon}
                  className="inline-flex items-center gap-1.5 text-xs text-terracotta-600 hover:text-terracotta-700 font-medium mt-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Usar imagen del proyecto como ícono (/image.png)
                </button>
              </div>
            </div>

            {/* PREVIEW */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                Simulación en la Pestaña del Navegador
              </label>
              <div className="bg-charcoal-100/70 border border-charcoal-200 p-4">
                {/* Mock browser tab */}
                <div className="bg-charcoal-200/50 rounded-t-lg p-2 pb-0 flex items-end">
                  <div className="bg-white border-t border-x border-charcoal-200 rounded-t-md px-3 py-2 flex items-center gap-2 max-w-[240px] shadow-sm">
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt="Favicon preview"
                        className="w-4 h-4 rounded-sm object-cover flex-shrink-0"
                      />
                    ) : (
                      <HardHat className="w-4 h-4 text-terracotta-500 flex-shrink-0" />
                    )}
                    <span className="text-xs font-medium text-charcoal-800 truncate">
                      {siteTitle}
                    </span>
                  </div>
                </div>
                <div className="bg-white border border-charcoal-200 p-4 text-xs text-charcoal-500">
                  El ícono seleccionado se inyectará dinámicamente como &lt;link rel="icon"&gt; en el navegador de todos los visitantes.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GENERAL BRAND INFO */}
        <div className="admin-card p-6 sm:p-8">
          <h2 className="text-lg font-bold text-charcoal-900 mb-4">Título del Sitio</h2>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
              Nombre de la Empresa o Título de la Web
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full text-sm p-3 border border-charcoal-200 focus:border-terracotta-500 focus:outline-none bg-white"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={handleResetDefaults}
            disabled={saving}
            className="text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restablecer valores originales
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              disabled={saving || uploadingLogo || uploadingIcon}
              className="btn-primary w-full sm:w-auto py-3 px-8 text-sm font-semibold flex items-center justify-center gap-2"
            >
              {saving ? 'Guardando en servidor...' : 'Guardar Cambios para Todos'}
            </button>
          </div>
        </div>
      </form>

      {/* HOSTINGER & SUPABASE INFO BOX */}
      <div className="mt-12 bg-charcoal-900 text-white p-6 border border-charcoal-800">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-terracotta-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-charcoal-300">
            <p className="font-semibold text-white text-sm">
              Despliegue en Hostinger & Sincronización en Servidor
            </p>
            <p>
              Esta aplicación está preparada para subirse a Hostinger (exportando a GitHub o ZIP).
              Al conectar las credenciales de base de datos en las variables de entorno:
            </p>
            <code className="block bg-charcoal-950 p-2 font-mono text-terracotta-300 border border-charcoal-800">
              VITE_SUPABASE_URL=tu_url_de_supabase<br />
              VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
            </code>
            <p>
              Tanto los proyectos, clientes, equipamiento como el logo y favicon se sincronizan directamente
              con la tabla en el servidor (<span className="font-mono text-white">site_settings</span>) para que todos los usuarios que entren a la web vean siempre los cambios en tiempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
