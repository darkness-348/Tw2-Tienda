import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../services/categories.service";
import type { CreateCategoriaDTO, UpdateCategoriaDTO } from "../types/categories.types";

export function useCategorias() {
  return useQuery({ queryKey: ["categorias"], queryFn: () => categoriesService.listar() });
}
export function useCreateCategoria() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: CreateCategoriaDTO) => categoriesService.crear(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["categorias"] }) });
}
export function useUpdateCategoria() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: UpdateCategoriaDTO) => categoriesService.actualizar(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["categorias"] }) });
}
export function useDeleteCategoria() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: number) => categoriesService.eliminar(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["categorias"] }) });
}
export function useToggleCategoriaStatus() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, activo }: { id: number; activo: boolean }) => categoriesService.toggleActivo(id, activo), onSuccess: () => qc.invalidateQueries({ queryKey: ["categorias"] }) });
}
