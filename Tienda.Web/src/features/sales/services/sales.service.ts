import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { Venta, CreateVentaDTO, UpdateVentaDTO, VentasFilter, VentasListResponse, DailyReportResponse } from "../types/sales.types";
import { mockVentas, mockDailyReport } from "../mocks/sales.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const filterVentas = (filter: VentasFilter): Venta[] => {
  let r = [...mockVentas];
  if (filter.estado) r = r.filter((v) => v.estado === filter.estado);
  if (filter.clienteNombre) r = r.filter((v) => v.cliente.nombre.toLowerCase().includes(filter.clienteNombre!.toLowerCase()));
  if (filter.metodoPagoId) r = r.filter((v) => v.metodoPagoId === filter.metodoPagoId);
  if (filter.fechaDesde) r = r.filter((v) => new Date(v.fechaVenta) >= new Date(filter.fechaDesde!));
  if (filter.fechaHasta) r = r.filter((v) => new Date(v.fechaVenta) <= new Date(filter.fechaHasta!));
  return r;
};

export const salesService = {
  async listar(filter: VentasFilter = {}): Promise<VentasListResponse> {
    if (USE_MOCKS) {
      await delay();
      const filtered = filterVentas(filter).sort((a, b) => new Date(b.fechaVenta).getTime() - new Date(a.fechaVenta).getTime());
      const page = filter.page || 1; const limit = filter.limit || 10;
      return { data: filtered.slice((page - 1) * limit, page * limit), total: filtered.length, page, limit };
    }
    const { data } = await api.get<VentasListResponse>("/ventas", { params: filter });
    return data;
  },

  async obtenerPorId(id: number): Promise<Venta> {
    if (USE_MOCKS) { await delay(); const v = mockVentas.find((v) => v.id === id); if (!v) throw new Error(`Venta ${id} no encontrada`); return v; }
    const { data } = await api.get<Venta>(`/ventas/${id}`);
    return data;
  },

  async crear(dto: CreateVentaDTO): Promise<Venta> {
    if (USE_MOCKS) {
      await delay();
      const subtotal = dto.items.reduce((s, i) => s + i.subtotal, 0);
      const newVenta: Venta = {
        id: Math.max(...mockVentas.map((v) => v.id), 0) + 1,
        numero: `V-2026-${String(mockVentas.length + 1).padStart(5, "0")}`,
        cliente: { nombre: dto.clienteNombre, email: dto.clienteEmail, telefono: dto.clienteTelefono },
        items: dto.items, subtotal, impuesto: subtotal * 0.1, total: subtotal * 1.1,
        metodoPagoId: dto.metodoPagoId, estado: "pendiente",
        fechaVenta: new Date().toISOString(), notas: dto.notas,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      };
      mockVentas.push(newVenta);
      return newVenta;
    }
    const { data } = await api.post<Venta>("/ventas", dto);
    return data;
  },

  async actualizar(dto: UpdateVentaDTO): Promise<Venta> {
    if (USE_MOCKS) {
      await delay();
      const idx = mockVentas.findIndex((v) => v.id === dto.id);
      if (idx === -1) throw new Error(`Venta ${dto.id} no encontrada`);
      mockVentas[idx] = { ...mockVentas[idx], ...dto, updatedAt: new Date().toISOString() };
      return mockVentas[idx];
    }
    const { data } = await api.put<Venta>(`/ventas/${dto.id}`, dto);
    return data;
  },

  async confirmarPago(ventaId: number): Promise<Venta> {
    if (USE_MOCKS) {
      await delay();
      const venta = mockVentas.find((v) => v.id === ventaId);
      if (!venta) throw new Error(`Venta ${ventaId} no encontrada`);
      venta.estado = "pagado"; venta.updatedAt = new Date().toISOString();
      return venta;
    }
    const { data } = await api.patch<Venta>(`/ventas/${ventaId}/confirmar`, {});
    return data;
  },

  async generarComprobante(ventaId: number): Promise<Blob> {
    if (USE_MOCKS) { await delay(); return new Blob([`Comprobante Venta #${ventaId}`], { type: "application/pdf" }); }
    const resp = await api.get(`/ventas/${ventaId}/comprobante`, { responseType: "blob" });
    return resp.data;
  },

  async reporteDiario(fecha: string): Promise<DailyReportResponse> {
    if (USE_MOCKS) { await delay(); return { ...mockDailyReport, fecha }; }
    const { data } = await api.get<DailyReportResponse>("/ventas/reportes/diario", { params: { fecha } });
    return data;
  },
};
