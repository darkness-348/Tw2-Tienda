import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { MovimientoStock, StockActual, CreateMovimientoStockDTO, MovimientosFilter, MovimientosResponse } from "../types/stock.types";
import { mockMovimientos } from "../mocks/stock.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const stockService = {
  async listarMovimientos(filter: MovimientosFilter = {}): Promise<MovimientosResponse> {
    if (USE_MOCKS) {
      await delay();
      let r = [...mockMovimientos];
      if (filter.productoId) r = r.filter((m) => m.productoId === filter.productoId);
      if (filter.tipo) r = r.filter((m) => m.tipo === filter.tipo);
      if (filter.fechaDesde) r = r.filter((m) => new Date(m.fecha) >= new Date(filter.fechaDesde!));
      if (filter.fechaHasta) r = r.filter((m) => new Date(m.fecha) <= new Date(filter.fechaHasta!));
      r.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      const page = filter.page || 1; const limit = filter.limit || 10;
      return { data: r.slice((page - 1) * limit, page * limit), total: r.length, page, limit };
    }
    const { data } = await api.get<MovimientosResponse>("/stock/movimientos", { params: filter });
    return data;
  },

  async registrarMovimiento(dto: CreateMovimientoStockDTO): Promise<MovimientoStock> {
    if (USE_MOCKS) {
      await delay();
      const newMov: MovimientoStock = { id: Math.max(...mockMovimientos.map((m) => m.id), 0) + 1, ...dto, fecha: new Date().toISOString(), createdAt: new Date().toISOString() };
      mockMovimientos.push(newMov);
      return newMov;
    }
    const { data } = await api.post<MovimientoStock>("/stock/movimientos", dto);
    return data;
  },

  async obtenerStockActual(productoId: number): Promise<StockActual> {
    if (USE_MOCKS) {
      await delay();
      const movs = mockMovimientos.filter((m) => m.productoId === productoId);
      return { productoId, cantidad: 15, stockMinimo: 5, ultimoMovimiento: movs[movs.length - 1] };
    }
    const { data } = await api.get<StockActual>(`/stock/actual/${productoId}`);
    return data;
  },
};
