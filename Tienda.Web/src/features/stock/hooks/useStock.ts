import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stockService } from "../services/stock.service";
import type { CreateMovimientoStockDTO, MovimientosFilter } from "../types/stock.types";

export function useMovimientos(filter?: MovimientosFilter) {
  return useQuery({ queryKey: ["stock-movimientos", filter], queryFn: () => stockService.listarMovimientos(filter) });
}
export function useRegistrarMovimiento() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMovimientoStockDTO) => stockService.registrarMovimiento(dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["stock-movimientos"] }); qc.invalidateQueries({ queryKey: ["products"] }); },
  });
}
export function useStockActual(productoId: number) {
  return useQuery({ queryKey: ["stock-actual", productoId], queryFn: () => stockService.obtenerStockActual(productoId), enabled: !!productoId });
}
