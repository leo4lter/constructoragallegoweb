import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const highlights = [
  'Empresa 100% local',
  '18 años de trayectoria en construcción',
  'Soluciones para entidades privadas y públicas',
  'Oportunidades de empleo y formación para jóvenes de la localidad',
];

export default function About() {
  return (
    <section id="nosotros" className="section-py bg-white">
      <div className="max-w-8xl mx-auto container-px">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-terracotta-500" />
              <span className="text-terracotta-500 text-sm font-semibold tracking-widest uppercase">
                Quiénes somos
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 mb-6">
              Soluciones reales desde nuestra localidad
            </h2>
            <p className="text-charcoal-600 text-lg leading-relaxed mb-8">
              Somos una empresa 100% local, con una trayectoria de 18 años en el
              rubro de la construcción. Brindamos soluciones reales tanto a
              entidades privadas como públicas, generando oportunidades de empleo
              y formando a los jóvenes de nuestra localidad.
            </p>
            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-charcoal-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-terracotta-500 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8961146/pexels-photo-8961146.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000"
                alt="Ingenieros revisando planos en obra"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-terracotta-500 text-white px-8 py-6 hidden sm:block">
              <p className="text-4xl font-bold">18</p>
              <p className="text-sm text-white/80 mt-1">años de trayectoria</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
