import { useState } from 'react';
import { Search, Plus, Pencil, X } from 'lucide-react';
import { useUsuarios, useToggleUsuarioEstado, useUpdateUsuario } from '../hooks/useUsers';
import type { Usuario } from '../types/users.types';

interface UsersViewProps {
  triggerToast: (msg: string) => void;
}

const ROLES = ['Todos', 'Gerente', 'Cajero', 'Encargado de Almacén'] as const;

export default function UsersView({ triggerToast }: UsersViewProps) {
  const [busqueda, setBusqueda] = useState('');
  const [filterRol, setFilterRol] = useState<typeof ROLES[number]>('Todos');
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [editForm, setEditForm] = useState({ nombres: '', apellidos: '', telefono: '', direccion: '', rol: '' });

  const { data: usuarios = [], isLoading } = useUsuarios({ busqueda: busqueda || undefined, rol: filterRol });
  const toggleEstado = useToggleUsuarioEstado();
  const updateUsuario = useUpdateUsuario();

  const openEdit = (u: Usuario) => {
    setEditingUser(u);
    setEditForm({ nombres: u.persona.nombres, apellidos: u.persona.apellidos, telefono: u.persona.telefono, direccion: u.persona.direccion, rol: u.rol });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    await updateUsuario.mutateAsync({ id: editingUser.id, nombres: editForm.nombres, apellidos: editForm.apellidos, telefono: editForm.telefono, direccion: editForm.direccion, rol: editForm.rol as Usuario['rol'] });
    triggerToast(`Usuario "${editForm.nombres} ${editForm.apellidos}" actualizado.`);
    setEditingUser(null);
  };

  const handleToggle = async (u: Usuario) => {
    await toggleEstado.mutateAsync(u.id);
    const next = u.estado === 'Activo' ? 'Deshabilitado' : 'Activo';
    triggerToast(`${u.persona.nombres} ${u.persona.apellidos} ahora está ${next}.`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 select-none">
        <div className="flex-1 flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o CI..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/10"
            />
          </div>
          <select
            value={filterRol}
            onChange={e => setFilterRol(e.target.value as typeof ROLES[number])}
            className="py-2 px-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none cursor-pointer"
          >
            {ROLES.map(r => <option key={r} value={r}>{r === 'Todos' ? 'Rol: Todos' : r}</option>)}
          </select>
        </div>
        <button
          onClick={() => triggerToast('Flujo de creación de nuevo usuario inicializado.')}
          className="flex items-center gap-1.5 py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /><span>Nuevo Usuario</span>
        </button>
      </div>

      {(busqueda || filterRol !== 'Todos') && (
        <p className="text-[12px] text-neutral-400 -mt-2 select-none">
          {usuarios.length} resultado{usuarios.length !== 1 ? 's' : ''} encontrado{usuarios.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="py-16 text-center text-[13px] text-neutral-400">Cargando usuarios...</div>
          ) : usuarios.length === 0 ? (
            <div className="py-16 text-center text-[13px] text-neutral-400">No se encontraron usuarios con los filtros actuales.</div>
          ) : (
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-850/50 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Nombre</th>
                  <th className="py-3.5 px-5">Email</th>
                  <th className="py-3.5 px-5">CI</th>
                  <th className="py-3.5 px-5">Rol</th>
                  <th className="py-3.5 px-5">Estado</th>
                  <th className="py-3.5 px-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {usuarios.map(u => (
                  <tr key={u.id} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-neutral-900 dark:text-white">{u.persona.nombres} {u.persona.apellidos}</td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono">{u.email}</td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono text-[12px]">{u.persona.ci}</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">{u.rol}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      {u.estado === 'Activo'
                        ? <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">{u.estado}</span>
                        : <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">{u.estado}</span>}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(u)} className="py-1 px-2.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1">
                          <Pencil className="w-3 h-3" /><span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleToggle(u)}
                          disabled={toggleEstado.isPending}
                          className={`py-1 px-2.5 border rounded text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-50 ${u.estado === 'Activo' ? 'border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20' : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50'}`}
                        >
                          {u.estado === 'Activo' ? 'Deshabilitar' : 'Habilitar'}
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

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setEditingUser(null)}>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-6 w-full max-w-md flex flex-col gap-5 animate-fadeIn" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-neutral-900 dark:text-white">Editar Usuario</h2>
              <button onClick={() => setEditingUser(null)} className="text-neutral-400 hover:text-neutral-600 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: 'Nombres', key: 'nombres' }, { label: 'Apellidos', key: 'apellidos' }, { label: 'Teléfono', key: 'telefono' }, { label: 'Dirección', key: 'direccion' }].map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-1.5 col-span-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{label}</label>
                  <input type="text" value={(editForm as Record<string, string>)[key]} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none focus:border-neutral-500" />
                </div>
              ))}
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Rol</label>
                <select value={editForm.rol} onChange={e => setEditForm(f => ({ ...f, rol: e.target.value }))} className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none">
                  {(['Gerente', 'Cajero', 'Encargado de Almacén'] as const).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => setEditingUser(null)} className="py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer">Cancelar</button>
              <button onClick={handleSaveEdit} disabled={updateUsuario.isPending} className="py-2 px-4 bg-neutral-700 hover:bg-neutral-800 dark:bg-neutral-200 dark:hover:bg-white text-white dark:text-neutral-950 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-60">
                {updateUsuario.isPending ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
