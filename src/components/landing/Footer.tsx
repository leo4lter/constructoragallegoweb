import { motion } from 'framer-motion';
import { MapPin, HardHat, ArrowUp } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function Footer({ onGoAdmin }: { onGoAdmin?: () => void }) {
  const { siteSettings } = useData();

  const handleHiddenAdmin = () => {
    if (onGoAdmin) {
      onGoAdmin();
    } else {
      window.location.hash = '/admin';
    }
  };

  return (
    <footer id="contacto" className="bg-charcoal-900 text-white">
      <div className="max-w-8xl mx-auto container-px py-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              {siteSettings?.logo_url ? (
                <img
                  src={siteSettings.logo_url}
                  alt="Constructora El Gallego"
                  className="h-10 w-auto max-w-[200px] object-contain brightness-110"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <>
                  <HardHat className="w-7 h-7 text-terracotta-500" strokeWidth={1.5} />
                  <span className="font-display font-bold text-xl">
                    {siteSettings?.site_title || 'Constructora El Gallego'}
                  </span>
                </>
              )}
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm">
              Empresa 100% local con 18 años de trayectoria en construcción.
              Soluciones reales para entidades privadas y públicas en Sierra Grande.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-6">
              Contacto
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-white/50 text-sm">Ubicación</p>
                  <p className="text-white text-base font-medium">Sierra Grande - Río Negro</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-6">
                Navegación
              </h3>
              <ul className="space-y-3">
                <li><a href="#nosotros" className="text-white/60 hover:text-terracotta-400 transition-colors">Sobre Nosotros</a></li>
                <li><a href="#areas" className="text-white/60 hover:text-terracotta-400 transition-colors">Áreas de Trabajo</a></li>
                <li><a href="#capacidad" className="text-white/60 hover:text-terracotta-400 transition-colors">Capacidad Operativa</a></li>
                <li><a href="#galeria" className="text-white/60 hover:text-terracotta-400 transition-colors">Galería</a></li>
              </ul>
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-white/60 hover:text-terracotta-400 transition-colors text-sm mt-8"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
              Volver arriba
            </a>
          </motion.div>
        </div>

        <div className="border-t border-charcoal-700 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Constructora El Gallego. Todos los derechos reservados.
          </p>
          {/* Subtle discreet dot only for direct operator click if needed, or user can navigate to #/admin */}
          <div className="flex items-center gap-3">
            <p className="text-white/40 text-sm">Sierra Grande · Río Negro · Argentina</p>
            <button
              onClick={handleHiddenAdmin}
              title="Acceso Administración"
              aria-label="Acceso Administración"
              className="w-2 h-2 rounded-full opacity-10 hover:opacity-75 transition-opacity bg-charcoal-500 cursor-default"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
