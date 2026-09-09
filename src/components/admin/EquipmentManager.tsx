import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/context/DataContext';
import type { Equipment } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, AlertCircle } from 'lucide-react';

const emptyForm: Omit<Equipment, 'id' | 'created_at'> = {
  name: '',
  description: '',
  image_url: '',
};

export default function EquipmentManager() {
  const { equipment, addEquipment, updateEquipment, deleteEquipment, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError('');
  };

  const openEdit = (e: Equipment) => {
    setForm({ name: e.name, description: e.description, image_url: e.image_url });
    setEditingId(e.id);
    setShowForm(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image_url.trim()) {
      setError('El nombre y la URL de imagen son obligatorios.');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateEquipment(editingId, form);
      } else {
        await addEquipment(form);
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este equipo?')) return;
    try {
      await deleteEquipment(id);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-charcoal-900">Gestor de Equipamiento</h1>
          <p className="text-charcoal-500 mt-1">Maquinarias y herramientas propias.</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2.5 px-5">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          Nuevo Equipo
        </button>
      </div>

      {loading ? (
        <div className="text-charcoal-400 text-center py-16">Cargando equipamiento...</div>
      ) : equipment.length === 0 ? (
        <div className="admin-card p-12 text-center">
          <p className="text-charcoal-400">No hay equipamiento. Agrega el primero.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipment.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="admin-card overflow-hidden group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-charcoal-100">
                <img src={e.image_url} alt={e.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-charcoal-900 mb-1">{e.name}</h3>
                <p className="text-sm text-charcoal-500 line-clamp-2 mb-4">{e.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(e)} className="flex-1 flex items-center justify-center gap-1.5 border border-charcoal-200 py-2 text-sm font-medium text-charcoal-700 hover:bg-charcoal-50 transition-colors">
                    <Pencil className="w-4 h-4" strokeWidth={1.5} /> Editar
                  </button>
                  <button onClick={() => handleDelete(e.id)} className="flex items-center justify-center gap-1.5 border border-charcoal-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors">
                    <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          >
            <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100 sticky top-0 bg-white z-10">
                <h2 className="text-lg font-bold text-charcoal-900">
                  {editingId ? 'Editar Equipo' : 'Nuevo Equipo'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-charcoal-400 hover:text-charcoal-700 p-1">
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Nombre *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Ej: Excavadora Hidráulica"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Descripción</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="input-field min-h-[100px] resize-y"
                    placeholder="Características del equipo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">URL de Imagen *</label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    className="input-field"
                    placeholder="https://..."
                  />
                  {form.image_url && (
                    <div className="mt-3 aspect-video bg-charcoal-100 overflow-hidden">
                      <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-sm py-2.5">
                    Cancelar
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary flex-1 text-sm py-2.5 disabled:opacity-50">
                    {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear equipo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
