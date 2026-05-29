import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import type { CreateUsuarioDTO, UpdateUsuarioDTO, UsuariosFilter } from "../types/users.types";

export function useUsuarios(filter?: UsuariosFilter) {
  return useQuery({ queryKey: ["usuarios", filter], queryFn: () => usersService.listar(filter) });
}
export function useUsuario(id: number) {
  return useQuery({ queryKey: ["usuarios", id], queryFn: () => usersService.obtenerPorId(id), enabled: !!id });
}
export function useCreateUsuario() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: CreateUsuarioDTO) => usersService.crear(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["usuarios"] }) });
}
export function useUpdateUsuario() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: UpdateUsuarioDTO) => usersService.actualizar(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["usuarios"] }) });
}
export function useToggleUsuarioEstado() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: number) => usersService.toggleEstado(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["usuarios"] }) });
}
