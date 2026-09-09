import { motion } from 'framer-motion';
import { ArrowDown, HardHat } from 'lucide-react';

const HERO_IMAGE = 'https://images.pexels.com/photos/15071423/pexels-photo-15071423.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Excavadora en obra de construcción"
          loading="eager"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/60 to-charcoal-900/85" />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto container-px w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-terracotta-500" />
            <span className="text-terracotta-300 text-sm font-semibold tracking-widest uppercase">
              Sierra Grande · Río Negro
            </span>
          </div>

          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
            Constructora El Gallego
          </h1>

          <p className="text-white/85 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
            Empresa 100% local con 18 años de trayectoria en construcción.
            Soluciones reales para entidades privadas y públicas, generando
            empleo y formación para los jóvenes de Sierra Grande.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#galeria" className="btn-primary">
              <HardHat className="w-5 h-5" strokeWidth={1.5} />
              Ver Proyectos
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white font-semibold px-7 py-3.5 hover:bg-white hover:text-charcoal-800 transition-all duration-300"
            >
              Contáctanos
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors"
        aria-label="Desplazarse hacia abajo"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" strokeWidth={1.5} />
      </motion.a>
    </section>
  );
}
