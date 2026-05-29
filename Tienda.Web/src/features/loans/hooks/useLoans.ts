import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loansService } from "../services/loans.service";
import type { CreatePrestamoDTO, RegistrarPagoPrestamoDTO, PrestamosFilter } from "../types/loans.types";

export function usePrestamos(filter?: PrestamosFilter) {
  return useQuery({ queryKey: ["prestamos", filter], queryFn: () => loansService.listar(filter) });
}
export function usePrestamo(id: number) {
  return useQuery({ queryKey: ["prestamos", id], queryFn: () => loansService.obtenerPorId(id), enabled: !!id });
}
export function useCreatePrestamo() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: CreatePrestamoDTO) => loansService.crear(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["prestamos"] }) });
}
export function useRegistrarPagoPrestamo() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: RegistrarPagoPrestamoDTO) => loansService.registrarPago(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["prestamos"] }) });
}
export function useEliminarPrestamo() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: number) => loansService.eliminar(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["prestamos"] }) });
}
