import { motion } from 'framer-motion';
import {
  Building2,
  PaintRoller,
  Truck,
  Layers,
  HardHat,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type WorkArea = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const areas: WorkArea[] = [
  {
    icon: Building2,
    title: 'Construcción',
    description: 'Obras privadas y públicas de cualquier escala.',
  },
  {
    icon: HardHat,
    title: 'Remodelaciones',
    description: 'Renovación y ampliación de espacios existentes.',
  },
  {
    icon: PaintRoller,
    title: 'Pintura',
    description: 'Pintura interior y exterior para todo tipo de edificaciones.',
  },
  {
    icon: Truck,
    title: 'Servicio de Camiones',
    description: 'Transporte y logística con flota propia.',
  },
  {
    icon: Layers,
    title: 'Movimiento de Suelo',
    description: 'Excavación, relleno y preparación de terrenos.',
  },
];

export default function WorkAreas() {
  return (
    <section id="areas" className="section-py bg-charcoal-50">
      <div className="max-w-8xl mx-auto container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-px bg-terracotta-500" />
            <span className="text-terracotta-500 text-sm font-semibold tracking-widest uppercase">
              Áreas de Trabajo
            </span>
            <div className="w-10 h-px bg-terracotta-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-charcoal-900">
            Especialistas en cada frente de obra
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal-100">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white p-8 lg:p-10 hover:bg-terracotta-50 transition-colors duration-300 cursor-default"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-charcoal-50 group-hover:bg-terracotta-100 transition-colors duration-300 mb-6">
                <area.icon
                  className="w-7 h-7 text-terracotta-500"
                  strokeWidth={1.25}
                />
              </div>
              <h3 className="text-xl text-charcoal-900 mb-3">{area.title}</h3>
              <p className="text-charcoal-500 leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-terracotta-500 p-8 lg:p-10 flex flex-col justify-center"
          >
            <h3 className="text-xl text-white mb-3">¿Necesitas un presupuesto?</h3>
            <p className="text-white/80 leading-relaxed mb-5">
              Evaluamos tu proyecto y te brindamos una propuesta a medida.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-white text-terracotta-600 font-semibold px-6 py-3 hover:bg-terracotta-50 transition-colors"
            >
              Solicitar cotización
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
