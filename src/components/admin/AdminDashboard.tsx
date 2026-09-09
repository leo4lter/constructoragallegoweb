import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';
import { Building2, HardHat, Wrench, TrendingUp } from 'lucide-react';
import type { AdminSection } from '@/components/admin/AdminLayout';

export default function AdminDashboard({
  onNavigate,
}: {
  onNavigate: (s: AdminSection) => void;
}) {
  const { projects, clients, equipment } = useData();

  const stats = [
    { label: 'Proyectos', value: projects.length, icon: Building2, section: 'projects' as AdminSection, color: 'terracotta' },
    { label: 'Clientes', value: clients.length, icon: HardHat, section: 'clients' as AdminSection, color: 'charcoal' },
    { label: 'Equipamiento', value: equipment.length, icon: Wrench, section: 'equipment' as AdminSection, color: 'charcoal' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal-900">Resumen</h1>
        <p className="text-charcoal-500 mt-1">Vista general del contenido del sitio.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {stats.map((stat, i) => (
          <motion.button
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => onNavigate(stat.section)}
            className="admin-card p-6 text-left hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 flex items-center justify-center ${stat.color === 'terracotta' ? 'bg-terracotta-50' : 'bg-charcoal-100'}`}>
                <stat.icon className={`w-6 h-6 ${stat.color === 'terracotta' ? 'text-terracotta-500' : 'text-charcoal-600'}`} strokeWidth={1.5} />
              </div>
              <TrendingUp className="w-5 h-5 text-charcoal-300 group-hover:text-terracotta-500 transition-colors" strokeWidth={1.5} />
            </div>
            <p className="text-3xl font-bold text-charcoal-900">{stat.value}</p>
            <p className="text-charcoal-500 text-sm mt-1">{stat.label}</p>
          </motion.button>
        ))}
      </div>

      <div className="admin-card p-6 sm:p-8">
        <h2 className="text-lg font-bold text-charcoal-900 mb-4">Gestión rápida</h2>
        <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
          Usa el panel lateral para gestionar los proyectos, clientes y equipamiento
          que se muestran en la página principal. Los cambios se reflejan
          inmediatamente en el sitio.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onNavigate('projects')} className="btn-primary text-sm py-2.5 px-5">
            Gestionar Proyectos
          </button>
          <button onClick={() => onNavigate('clients')} className="btn-secondary text-sm py-2.5 px-5">
            Gestionar Clientes
          </button>
          <button onClick={() => onNavigate('equipment')} className="btn-secondary text-sm py-2.5 px-5">
            Gestionar Equipamiento
          </button>
        </div>
      </div>
    </div>
  );
}
