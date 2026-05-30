import { useState } from 'react';
import { Search, Plus, Pencil, ToggleLeft, ToggleRight, Truck } from 'lucide-react';
import { useProveedores, useCreateProveedor, useUpdateProveedor, useToggleProveedorEstado } from '../hooks/useProviders';
import type { Proveedor } from '../types/providers.types';

interface ProvidersViewProps {
  triggerToast: (msg: string) => void;
}

const EMPTY_FORM = { nombre: '', contacto: '', telefono: '', direccion: '', email: '', codigoProveedor: '' };

export default function ProvidersView({ triggerToast }: ProvidersViewProps) {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');

  const { data: proveedores = [], isLoading } = useProveedores();
  const createProveedor = useCreateProveedor();
  const updateProveedor = useUpdateProveedor();
  const toggleEstado = useToggleProveedorEstado();

  const filtered = proveedores.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.nombre.toLowerCase().includes(q) || (p.contacto ?? '').toLowerCase().includes(q);
  });

  const openCreate = () => { setEditingId(null); setForm(EMPTY_FORM); setFormError(''); setShowModal(true); };
  const openEdit = (p: Proveedor) => {
    setEditingId(p.id);
    setForm({ nombre: p.nombre, contacto: p.contacto ?? '', telefono: p.telefono, direccion: p.direccion, email: p.email ?? '', codigoProveedor: p.codigoProveedor ?? '' });
    setFormError('');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim()) { setFormError('El nombre es obligatorio.'); return; }
    if (editingId !== null) {
      await updateProveedor.mutateAsync({ id: editingId, ...form });
      triggerToast(`Proveedor "${form.nombre}" actualizado.`);
    } else {
      await createProveedor.mutateAsync(form);
      triggerToast(`Proveedor "${form.nombre}" registrado.`);
    }
    setShowModal(false);
  };

  const handleToggle = async (p: Proveedor) => {
    await toggleEstado.mutateAsync(p.id);
    triggerToast(`"${p.nombre}" marcado como ${p.estado === 'Activo' ? 'Inactivo' : 'Activo'}.`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 select-none">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input type="text" placeholder="Buscar proveedor..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none focus:border-neutral-500" />
        </div>
        <button onClick={openCreate} className="flex items-center gap-1.5 py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap">
          <Plus className="w-4 h-4" /><span>Nuevo Proveedor</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="py-16 text-center text-[13px] text-neutral-400">Cargando proveedores...</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-neutral-400">
              <Truck className="w-8 h-8 opacity-30" />
              <p className="text-[13px]">No hay proveedores registrados.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-850/50 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">#</th>
                  <th className="py-3.5 px-5">Nombre</th>
                  <th className="py-3.5 px-5">Contacto</th>
                  <th className="py-3.5 px-5">Teléfono</th>
                  <th className="py-3.5 px-5">Código</th>
                  <th className="py-3.5 px-5">Estado</th>
                  <th className="py-3.5 px-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                    <td className="py-3.5 px-5 text-neutral-400 font-mono text-[11px]">{p.id}</td>
                    <td className="py-3.5 px-5 font-bold text-neutral-900 dark:text-white">{p.nombre}</td>
                    <td className="py-3.5 px-5 text-neutral-600 dark:text-neutral-300">{p.contacto ?? '—'}</td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono">{p.telefono}</td>
                    <td className="py-3.5 px-5 text-neutral-400 font-mono text-[12px]">{p.codigoProveedor ?? '—'}</td>
                    <td className="py-3.5 px-5">
                      {p.estado === 'Activo'
                        ? <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Activo</span>
                        : <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">Inactivo</span>}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="py-1 px-2.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1">
                          <Pencil className="w-3 h-3" /><span>Editar</span>
                        </button>
                        <button onClick={() => handleToggle(p)} disabled={toggleEstado.isPending} className="py-1 px-2.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50">
                          {p.estado === 'Activo' ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                          <span>{p.estado === 'Activo' ? 'Desactivar' : 'Activar'}</span>
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
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-6 w-full max-w-md flex flex-col gap-5 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[16px] font-bold text-neutral-900 dark:text-white">{editingId !== null ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h2>
            <div className="grid grid-cols-2 gap-4">
              {([['Nombre *', 'nombre'], ['Código proveedor', 'codigoProveedor'], ['Contacto', 'contacto'], ['Teléfono', 'telefono'], ['Email', 'email'], ['Dirección', 'direccion']] as [string, string][]).map(([label, key]) => (
                <div key={key} className={`flex flex-col gap-1.5 ${key === 'nombre' || key === 'direccion' ? 'col-span-2' : ''}`}>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{label}</label>
                  <input type={key === 'email' ? 'email' : 'text'} value={(form as Record<string, string>)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none focus:border-neutral-500" />
                </div>
              ))}
            </div>
            {formError && <p className="text-[12px] text-red-500 font-medium">{formError}</p>}
            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer">Cancelar</button>
              <button onClick={handleSubmit} disabled={createProveedor.isPending || updateProveedor.isPending} className="py-2 px-4 bg-neutral-700 hover:bg-neutral-800 dark:bg-neutral-200 dark:hover:bg-white text-white dark:text-neutral-950 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-60">
                {(createProveedor.isPending || updateProveedor.isPending) ? 'Guardando...' : editingId !== null ? 'Guardar Cambios' : 'Registrar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
