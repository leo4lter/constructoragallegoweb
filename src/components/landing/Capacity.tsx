import { motion } from 'framer-motion';
import { Users, Wrench, HardHat } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Capacity = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const capacities: Capacity[] = [
  {
    icon: Users,
    title: 'Empresa 100% Local',
    description: 'Nacidos y radicados en Sierra Grande, conocemos el territorio.',
  },
  {
    icon: HardHat,
    title: '18 Años de Trayectoria',
    description: 'Experiencia comprobada en obras privadas y públicas.',
  },
  {
    icon: Wrench,
    title: 'Soluciones Reales',
    description: 'Respuestas concretas para entidades privadas y públicas.',
  },
  {
    icon: Users,
    title: 'Empleo y Formación',
    description: 'Generamos oportunidades para los jóvenes de la localidad.',
  },
];

export default function Capacity() {
  return (
    <section id="capacidad" className="section-py bg-charcoal-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-8xl mx-auto container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-px bg-terracotta-400" />
            <span className="text-terracotta-400 text-sm font-semibold tracking-widest uppercase">
              Capacidad Operativa
            </span>
            <div className="w-10 h-px bg-terracotta-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">
            Nuestra fortaleza
          </h2>
          <p className="text-white/70 text-lg mt-6 leading-relaxed">
            Empresa 100% local con 18 años de trayectoria, brindando soluciones
            reales y generando empleo para los jóvenes de Sierra Grande.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capacities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-charcoal-800 p-8 border border-charcoal-700 hover:border-terracotta-500 transition-colors duration-300"
            >
              <cap.icon className="w-8 h-8 text-terracotta-400 mb-5" strokeWidth={1.25} />
              <h3 className="text-lg text-white mb-2">{cap.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
