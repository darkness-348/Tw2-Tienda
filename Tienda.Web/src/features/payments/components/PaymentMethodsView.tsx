import { useState } from 'react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, CreditCard } from 'lucide-react';
import { useMetodosPago, useCreateMetodoPago, useUpdateMetodoPago, useToggleMetodoPago } from '../hooks/usePayments';
import type { MetodoPago } from '../types/payments.types';

interface PaymentMethodsViewProps {
  triggerToast: (msg: string) => void;
}

type FormData = { nombre: string; descripcion: string; activo: boolean };
const EMPTY_FORM: FormData = { nombre: '', descripcion: '', activo: true };

export default function PaymentMethodsView({ triggerToast }: PaymentMethodsViewProps) {
  const { data: payments = [], isLoading } = useMetodosPago();
  const createMutation = useCreateMetodoPago();
  const updateMutation = useUpdateMetodoPago();
  const toggleMutation = useToggleMetodoPago();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  const openCreate = () => { setEditingId(null); setForm(EMPTY_FORM); setFormError(''); setShowModal(true); };
  const openEdit = (p: MetodoPago) => { setEditingId(p.id); setForm({ nombre: p.nombre, descripcion: p.descripcion ?? '', activo: p.activo }); setFormError(''); setShowModal(true); };

  const handleSubmit = async () => {
    if (!form.nombre.trim()) { setFormError('El nombre es obligatorio.'); return; }
    if (editingId !== null) {
      await updateMutation.mutateAsync({ id: editingId, nombre: form.nombre, descripcion: form.descripcion });
      triggerToast(`Método de pago "${form.nombre}" actualizado.`);
    } else {
      await createMutation.mutateAsync({ nombre: form.nombre, descripcion: form.descripcion });
      triggerToast(`Método de pago "${form.nombre}" registrado.`);
    }
    setShowModal(false);
  };

  const handleToggle = async (p: MetodoPago) => {
    await toggleMutation.mutateAsync({ id: p.id, activo: !p.activo });
    triggerToast(`"${p.nombre}" marcado como ${p.activo ? 'Inactivo' : 'Activo'}.`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 select-none">
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400">Administra los métodos de cobro disponibles en el punto de venta.</p>
        <button onClick={openCreate} className="flex items-center gap-1.5 py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap">
          <Plus className="w-4 h-4" /><span>Nuevo Método</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="py-16 text-center text-[13px] text-neutral-400">Cargando...</div>
          ) : payments.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-neutral-400">
              <CreditCard className="w-8 h-8 opacity-30" />
              <p className="text-[13px]">No hay métodos de pago registrados.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-850/50 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">#</th>
                  <th className="py-3.5 px-5">Nombre</th>
                  <th className="py-3.5 px-5">Descripción</th>
                  <th className="py-3.5 px-5">Comisión</th>
                  <th className="py-3.5 px-5">Estado</th>
                  <th className="py-3.5 px-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                    <td className="py-3.5 px-5 text-neutral-400 font-mono text-[11px]">{p.id}</td>
                    <td className="py-3.5 px-5 font-bold text-neutral-900 dark:text-white">{p.nombre}</td>
                    <td className="py-3.5 px-5 text-neutral-500 dark:text-neutral-400">{p.descripcion ?? '—'}</td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono text-[12px]">{p.comision !== undefined ? `${p.comision}%` : '—'}</td>
                    <td className="py-3.5 px-5">
                      {p.activo
                        ? <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Activo</span>
                        : <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">Inactivo</span>}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="py-1 px-2.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1">
                          <Pencil className="w-3 h-3" /><span>Editar</span>
                        </button>
                        <button onClick={() => handleToggle(p)} disabled={toggleMutation.isPending} className="py-1 px-2.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50">
                          {p.activo ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                          <span>{p.activo ? 'Desactivar' : 'Activar'}</span>
                        </button>
                        <button onClick={() => setConfirmDeleteId(p.id)} className="py-1 px-2.5 border border-red-200 dark:border-red-950/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /><span>Eliminar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-6 w-full max-w-md flex flex-col gap-5 animate-fadeIn" onClick={e => e.stopPropagation()}>
            <h2 className="text-[16px] font-bold text-neutral-900 dark:text-white">{editingId !== null ? 'Editar Método de Pago' : 'Nuevo Método de Pago'}</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Nombre *</label>
                <input type="text" value={form.nombre} onChange={e => { setForm(f => ({ ...f, nombre: e.target.value })); setFormError(''); }} placeholder="Ej: Efectivo, QR, Tarjeta..." className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none focus:border-neutral-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Descripción</label>
                <input type="text" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Descripción breve..." className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none focus:border-neutral-500" />
              </div>
              {formError && <p className="text-[12px] text-red-500 font-medium">{formError}</p>}
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer">Cancelar</button>
              <button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending} className="py-2 px-4 bg-neutral-700 hover:bg-neutral-800 dark:bg-neutral-200 dark:hover:bg-white text-white dark:text-neutral-950 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-60">
                {(createMutation.isPending || updateMutation.isPending) ? 'Guardando...' : editingId !== null ? 'Guardar Cambios' : 'Registrar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDeleteId !== null && (() => {
        const target = payments.find(p => p.id === confirmDeleteId);
        if (!target) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setConfirmDeleteId(null)}>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-6 w-full max-w-sm flex flex-col gap-4 animate-fadeIn" onClick={e => e.stopPropagation()}>
              <h2 className="text-[15px] font-bold text-neutral-900 dark:text-white">¿Eliminar método de pago?</h2>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400">Se eliminará permanentemente <strong className="text-neutral-800 dark:text-neutral-200">"{target.nombre}"</strong>. Esta acción no se puede deshacer.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setConfirmDeleteId(null)} className="py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-[13px] font-semibold text-neutral-600 transition-colors cursor-pointer">Cancelar</button>
                <button onClick={() => { triggerToast(`Método "${target.nombre}" eliminado.`); setConfirmDeleteId(null); }} className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer">Eliminar</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
