import { useState } from 'react';
import { Search, Plus, Pencil, X } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import type { UsuarioConPersona, RolUsuario } from '../types';

interface UsersViewProps {
  triggerToast: (msg: string) => void;
}

const ROLES: RolUsuario[] = ['Todos', 'Gerente', 'Cajero', 'Encargado de Almacén'];

export default function UsersView({ triggerToast }: UsersViewProps) {
  const {
    filteredUsers,
    loading,
    searchTerm,
    setSearchTerm,
    filterRol,
    setFilterRol,
    toggleEstado,
    updateUser,
  } = useUsers();

  const [editingUser, setEditingUser] = useState<UsuarioConPersona | null>(null);
  const [editForm, setEditForm] = useState<Partial<UsuarioConPersona>>({});

  const openEdit = (user: UsuarioConPersona) => {
    setEditingUser(user);
    setEditForm({
      Nombres: user.Nombres,
      Apellidos: user.Apellidos,
      Telefono: user.Telefono,
      Direccion: user.Direccion,
      Rol: user.Rol,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    await updateUser(editingUser.Id, editForm);
    triggerToast(`Usuario "${editForm.Nombres} ${editForm.Apellidos}" actualizado.`);
    setEditingUser(null);
  };

  const handleToggle = async (user: UsuarioConPersona) => {
    await toggleEstado(user.Id);
    const next = user.Estado === 'Activo' ? 'Deshabilitado' : 'Activo';
    triggerToast(`${user.Nombres} ${user.Apellidos} ahora está ${next}.`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 select-none">
        <div className="flex-1 flex gap-3 flex-wrap">
          {/* Search by name or email */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o CI..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/10"
            />
          </div>

          {/* Filter by role */}
          <select
            value={filterRol}
            onChange={e => setFilterRol(e.target.value as RolUsuario)}
            className="py-2 px-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none cursor-pointer"
          >
            {ROLES.map(r => (
              <option key={r} value={r}>{r === 'Todos' ? 'Rol: Todos' : r}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => triggerToast('Flujo de creación de nuevo usuario inicializado.')}
          className="flex items-center gap-1.5 py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Result count */}
      {searchTerm || filterRol !== 'Todos' ? (
        <p className="text-[12px] text-neutral-400 -mt-2 select-none">
          {filteredUsers.length} resultado{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
        </p>
      ) : null}

      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
        <div className="overflow-x-auto w-full">
          {loading ? (
            <div className="py-16 text-center text-[13px] text-neutral-400">Cargando usuarios...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-16 text-center text-[13px] text-neutral-400">
              No se encontraron usuarios con los filtros actuales.
            </div>
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
                {filteredUsers.map(user => (
                  <tr key={user.Id} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-neutral-900 dark:text-white">
                      {user.Nombres} {user.Apellidos}
                    </td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono">{user.Email}</td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono text-[12px]">{user.Ci}</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-450 text-[10px] font-bold uppercase tracking-wider">
                        {user.Rol}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      {user.Estado === 'Activo' ? (
                        <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
                          {user.Estado}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-450 dark:text-neutral-550 text-[10px] font-bold uppercase tracking-wider">
                          {user.Estado}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(user)}
                          className="py-1 px-2.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleToggle(user)}
                          className={`py-1 px-2.5 border rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                            user.Estado === 'Activo'
                              ? 'border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20'
                              : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                          }`}
                        >
                          {user.Estado === 'Activo' ? 'Deshabilitar' : 'Habilitar'}
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
          <div
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-6 w-full max-w-md flex flex-col gap-5 animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-neutral-900 dark:text-white">Editar Usuario</h2>
              <button onClick={() => setEditingUser(null)} className="text-neutral-400 hover:text-neutral-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Nombres', key: 'Nombres' },
                { label: 'Apellidos', key: 'Apellidos' },
                { label: 'Teléfono', key: 'Telefono' },
                { label: 'Dirección', key: 'Direccion' },
              ].map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-1.5 col-span-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{label}</label>
                  <input
                    type="text"
                    value={(editForm as Record<string, string>)[key] ?? ''}
                    onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none focus:border-neutral-500"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Rol</label>
                <select
                  value={editForm.Rol ?? ''}
                  onChange={e => setEditForm(f => ({ ...f, Rol: e.target.value }))}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none"
                >
                  {(['Gerente', 'Cajero', 'Encargado de Almacén'] as const).map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={() => setEditingUser(null)}
                className="py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="py-2 px-4 bg-neutral-700 hover:bg-neutral-800 dark:bg-neutral-200 dark:hover:bg-white text-white dark:text-neutral-950 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
