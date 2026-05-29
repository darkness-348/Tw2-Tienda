import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { salesService } from "../services/sales.service";
import type { CreateVentaDTO, UpdateVentaDTO, VentasFilter } from "../types/sales.types";

export function useVentas(filter?: VentasFilter) {
  return useQuery({ queryKey: ["ventas", filter], queryFn: () => salesService.listar(filter) });
}
export function useVenta(id: number) {
  return useQuery({ queryKey: ["ventas", id], queryFn: () => salesService.obtenerPorId(id), enabled: !!id });
}
export function useCrearVenta() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: CreateVentaDTO) => salesService.crear(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["ventas"] }) });
}
export function useActualizarVenta() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (dto: UpdateVentaDTO) => salesService.actualizar(dto), onSuccess: () => qc.invalidateQueries({ queryKey: ["ventas"] }) });
}
export function useConfirmarPago() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (ventaId: number) => salesService.confirmarPago(ventaId), onSuccess: () => qc.invalidateQueries({ queryKey: ["ventas"] }) });
}
export function useGenerarComprobante() {
  return useMutation({ mutationFn: (ventaId: number) => salesService.generarComprobante(ventaId) });
}
export function useReporteDiario(fecha: string) {
  return useQuery({ queryKey: ["ventas", "reporte-diario", fecha], queryFn: () => salesService.reporteDiario(fecha) });
}
