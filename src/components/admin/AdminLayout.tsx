import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardHat,
  LayoutGrid,
  Building2,
  Wrench,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Palette,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AdminSection = 'dashboard' | 'projects' | 'clients' | 'equipment' | 'branding';

type SidebarProps = {
  active: AdminSection;
  onNavigate: (section: AdminSection) => void;
  onLogout: () => void;
  onGoHome?: () => void;
};

type NavItem = {
  id: AdminSection;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Resumen', icon: LayoutGrid },
  { id: 'branding', label: 'Logo & Marca', icon: Palette },
  { id: 'projects', label: 'Proyectos', icon: Building2 },
  { id: 'clients', label: 'Clientes', icon: HardHat },
  { id: 'equipment', label: 'Equipamiento', icon: Wrench },
];

function SidebarContent({ active, onNavigate, onLogout, onGoHome }: SidebarProps) {
  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.hash = '';
      window.location.pathname = '/';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-6 border-b border-charcoal-700">
        <button onClick={handleGoHome} className="flex items-center gap-2.5 text-left">
          <HardHat className="w-6 h-6 text-terracotta-500" strokeWidth={1.5} />
          <div>
            <p className="font-display font-bold text-white text-sm">El Gallego</p>
            <p className="text-charcoal-400 text-xs">Panel Admin</p>
          </div>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
              active === item.id
                ? 'bg-terracotta-500 text-white'
                : 'text-charcoal-300 hover:bg-charcoal-700 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" strokeWidth={1.5} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-charcoal-700 space-y-1">
        <button
          onClick={handleGoHome}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-charcoal-300 hover:bg-charcoal-700 hover:text-white transition-colors"
        >
          <ExternalLink className="w-5 h-5" strokeWidth={1.5} />
          Ver sitio
        </button>
        <button
          onClick={() => {
            onLogout();
            handleGoHome();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-charcoal-300 hover:bg-red-900/40 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({
  active,
  onNavigate,
  onLogout,
  onGoHome,
  children,
}: {
  active: AdminSection;
  onNavigate: (s: AdminSection) => void;
  onLogout: () => void;
  onGoHome?: () => void;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-charcoal-50 flex">
      <aside className="hidden lg:flex w-64 bg-charcoal-900 fixed inset-y-0 left-0 z-40">
        <SidebarContent active={active} onNavigate={onNavigate} onLogout={onLogout} onGoHome={onGoHome} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-charcoal-900/60" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-64 bg-charcoal-900"
            >
              <SidebarContent active={active} onNavigate={(s) => { onNavigate(s); setMobileOpen(false); }} onLogout={onLogout} onGoHome={onGoHome} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-64">
        <header className="lg:hidden bg-white border-b border-charcoal-100 px-5 py-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="text-charcoal-700 p-1">
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <span className="font-display font-bold text-charcoal-800 text-sm">El Gallego · Admin</span>
          <button onClick={onLogout} className="text-charcoal-600 p-1">
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </header>

        <main className="p-5 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
