import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentsService } from "../services/payments.service";
import type { CreateMetodoPagoDTO, UpdateMetodoPagoDTO } from "../types/payments.types";

export function useMetodosPago() {
  return useQuery({
    queryKey: ["metodos-pago"],
    queryFn: () => paymentsService.listar(),
  });
}

export function useMetodoPago(id: number) {
  return useQuery({
    queryKey: ["metodos-pago", id],
    queryFn: () => paymentsService.obtenerPorId(id),
    enabled: !!id,
  });
}

export function useCreateMetodoPago() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMetodoPagoDTO) => paymentsService.crear(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["metodos-pago"] }),
  });
}

export function useUpdateMetodoPago() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateMetodoPagoDTO) => paymentsService.actualizar(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["metodos-pago"] }),
  });
}

export function useToggleMetodoPago() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, activo }: { id: number; activo: boolean }) =>
      paymentsService.toggleActivo(id, activo),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["metodos-pago"] }),
  });
}

export function useRegistrarPago() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { ventaId: number; metodoPagoId: number; monto: number; detalles?: Record<string, unknown> }) =>
      paymentsService.registrarPago(args.ventaId, args.metodoPagoId, args.monto, args.detalles),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ventas"] }),
  });
}
