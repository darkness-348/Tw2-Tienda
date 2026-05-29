import { useState, useEffect, useCallback } from 'react';
import type { UsuarioConPersona, RolUsuario } from '../types';
import { usersService } from '../services/usersService';

export function useUsers() {
  const [users, setUsers] = useState<UsuarioConPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRol, setFilterRol] = useState<RolUsuario>('Todos');

  const load = useCallback(async () => {
    setLoading(true);
    const data = await usersService.getAll();
    setUsers(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      `${u.Nombres} ${u.Apellidos}`.toLowerCase().includes(term) ||
      u.Email.toLowerCase().includes(term) ||
      u.Ci.toLowerCase().includes(term);
    const matchRol = filterRol === 'Todos' || u.Rol === filterRol;
    return matchSearch && matchRol;
  });

  const toggleEstado = useCallback(async (id: number) => {
    const updated = await usersService.toggleEstado(id);
    setUsers(updated);
  }, []);

  const updateUser = useCallback(async (id: number, data: Partial<UsuarioConPersona>) => {
    const updated = await usersService.update(id, data);
    setUsers(updated);
  }, []);

  return {
    filteredUsers,
    loading,
    searchTerm,
    setSearchTerm,
    filterRol,
    setFilterRol,
    toggleEstado,
    updateUser,
  };
}
