import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/context/DataContext';
import { X, ImageIcon } from 'lucide-react';

export default function Gallery() {
  const { projects, loading } = useData();
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ['Todos', ...Array.from(cats)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === 'Todos') return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <section id="galeria" className="section-py bg-white">
      <div className="max-w-8xl mx-auto container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-px bg-terracotta-500" />
            <span className="text-terracotta-500 text-sm font-semibold tracking-widest uppercase">
              Galería de Proyectos
            </span>
            <div className="w-10 h-px bg-terracotta-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-charcoal-900">
            Obras que hablan por nosotros
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-charcoal-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 text-sm font-medium border transition-all duration-300 ${
                    filter === cat
                      ? 'bg-terracotta-500 text-white border-terracotta-500'
                      : 'bg-white text-charcoal-600 border-charcoal-200 hover:border-terracotta-500 hover:text-terracotta-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-charcoal-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-4" strokeWidth={1} />
                <p>No hay proyectos en esta categoría.</p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                    onClick={() => setSelected(project.id)}
                    className="group relative overflow-hidden cursor-pointer break-inside-avoid"
                  >
                    <img
                      src={project.image_url}
                      alt={project.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-terracotta-300 text-xs font-semibold tracking-widest uppercase mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-white text-xl font-bold">{project.title}</h3>
                      <p className="text-white/70 text-sm mt-1 line-clamp-2">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-5"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-charcoal-900/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white max-w-3xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 p-2 text-charcoal-700 hover:bg-terracotta-500 hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="p-6 sm:p-8">
                <span className="text-terracotta-500 text-xs font-semibold tracking-widest uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl text-charcoal-900 mt-2 mb-3">{selectedProject.title}</h3>
                <p className="text-charcoal-600 leading-relaxed">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
