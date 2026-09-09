import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, HardHat, ArrowRight } from 'lucide-react';
import { safeSessionStorage } from '@/lib/storage';

const ADMIN_PASSWORD = 'elgallego2024';

type LoginProps = {
  onSuccess: () => void;
};

export default function AdminLogin({ onSuccess }: LoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        safeSessionStorage.setItem('admin_auth', 'true');
        onSuccess();
      } else {
        setError('Contraseña incorrecta. Intenta nuevamente.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-5">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terracotta-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white w-full max-w-md p-8 sm:p-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-terracotta-500 flex items-center justify-center">
            <HardHat className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-charcoal-900">Constructora El Gallego</h1>
            <p className="text-sm text-charcoal-500">Panel de Administración</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" strokeWidth={1.5} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="input-field pl-11"
              autoFocus
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm mt-3"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando...' : 'Acceder'}
            {!loading && <ArrowRight className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </form>

        <div className="mt-6 p-4 bg-charcoal-50 border border-charcoal-100">
          <p className="text-xs text-charcoal-500 leading-relaxed">
            <span className="font-semibold text-charcoal-700">Demo:</span> la contraseña es{' '}
            <code className="bg-white px-1.5 py-0.5 text-terracotta-600 font-mono">elgallego2024</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function RequireAuth({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
