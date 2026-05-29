import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { ReporteVentas, ReporteCompras, PeriodoReporte } from "../types/reports.types";
import { mockReporteVentas, mockReporteCompras } from "../mocks/reports.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const reportsService = {
  async obtenerReporteVentas(periodo: PeriodoReporte): Promise<ReporteVentas> {
    if (USE_MOCKS) { await delay(); return mockReporteVentas[periodo]; }
    const { data } = await api.get<ReporteVentas>("/reportes/ventas", { params: { periodo } });
    return data;
  },

  async obtenerReporteCompras(periodo: PeriodoReporte): Promise<ReporteCompras> {
    if (USE_MOCKS) { await delay(); return mockReporteCompras[periodo]; }
    const { data } = await api.get<ReporteCompras>("/reportes/compras", { params: { periodo } });
    return data;
  },

  async exportarPDF(tipo: "ventas" | "compras", periodo: PeriodoReporte): Promise<Blob> {
    if (USE_MOCKS) { await delay(); return new Blob([`Reporte PDF — ${tipo} — ${periodo}`], { type: "application/pdf" }); }
    const resp = await api.get(`/reportes/${tipo}/pdf`, { params: { periodo }, responseType: "blob" });
    return resp.data;
  },
};
