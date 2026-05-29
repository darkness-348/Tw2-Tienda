import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { providersService } from "../services/providers.service";
import type { CreateProveedorDTO, UpdateProveedorDTO, CalificacionProveedorDTO, ProveedoresFilter } from "../types/providers.types";

export function useProveedores(filter?: ProveedoresFilter) {
  return useQuery({ queryKey: ["proveedores", filter], queryFn: () => providersService.listar(filter) });
}
export function useProveedor(id: number) {
  return useQuery({ queryKey: ["proveedores", id], queryFn: () => providersService.obtenerPorId(id), enabled: !!id });
}
export function useCreateProveedor() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: CreateProveedorDTO) => providersService.crear(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["proveedores"] }) });
}
export function useUpdateProveedor() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: UpdateProveedorDTO) => providersService.actualizar(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["proveedores"] }) });
}
export function useToggleProveedorEstado() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: number) => providersService.toggleEstado(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["proveedores"] }) });
}
export function useCalificarProveedor() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: CalificacionProveedorDTO) => providersService.calificar(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["proveedores"] }) });
}
