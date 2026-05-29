import { useMutation, useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import type { PeriodoReporte } from "../types/reports.types";

export function useReporteVentas(periodo: PeriodoReporte) {
  return useQuery({
    queryKey: ["reporte-ventas", periodo],
    queryFn: () => reportsService.obtenerReporteVentas(periodo),
  });
}

export function useReporteCompras(periodo: PeriodoReporte) {
  return useQuery({
    queryKey: ["reporte-compras", periodo],
    queryFn: () => reportsService.obtenerReporteCompras(periodo),
  });
}

export function useExportarReportePDF() {
  return useMutation({
    mutationFn: ({ tipo, periodo }: { tipo: "ventas" | "compras"; periodo: PeriodoReporte }) =>
      reportsService.exportarPDF(tipo, periodo),
  });
}
