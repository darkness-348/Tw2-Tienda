import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { Prestamo, CreatePrestamoDTO, RegistrarPagoPrestamoDTO, PrestamosFilter } from "../types/loans.types";
import { mockPrestamos } from "../mocks/loans.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const loansService = {
  async listar(filter: PrestamosFilter = {}): Promise<Prestamo[]> {
    if (USE_MOCKS) {
      await delay();
      let r = [...mockPrestamos];
      if (filter.estado) r = r.filter((p) => p.estado === filter.estado);
      if (filter.clienteNombre) r = r.filter((p) => p.clienteNombre.toLowerCase().includes(filter.clienteNombre!.toLowerCase()));
      return r;
    }
    const { data } = await api.get<Prestamo[]>("/prestamos", { params: filter });
    return data;
  },

  async obtenerPorId(id: number): Promise<Prestamo> {
    if (USE_MOCKS) {
      await delay();
      const p = mockPrestamos.find((p) => p.id === id);
      if (!p) throw new Error(`Préstamo ${id} no encontrado`);
      return p;
    }
    const { data } = await api.get<Prestamo>(`/prestamos/${id}`);
    return data;
  },

  async crear(dto: CreatePrestamoDTO): Promise<Prestamo> {
    if (USE_MOCKS) {
      await delay();
      const newPrestamo: Prestamo = { id: Math.max(...mockPrestamos.map((p) => p.id), 0) + 1, ...dto, saldoPendiente: dto.monto, estado: "activo", pagos: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      mockPrestamos.push(newPrestamo);
      return newPrestamo;
    }
    const { data } = await api.post<Prestamo>("/prestamos", dto);
    return data;
  },

  async registrarPago(dto: RegistrarPagoPrestamoDTO): Promise<Prestamo> {
    if (USE_MOCKS) {
      await delay();
      const prestamo = mockPrestamos.find((p) => p.id === dto.prestamoId);
      if (!prestamo) throw new Error(`Préstamo ${dto.prestamoId} no encontrado`);
      prestamo.saldoPendiente = Math.max(0, prestamo.saldoPendiente - dto.monto);
      prestamo.estado = prestamo.saldoPendiente === 0 ? "pagado" : "activo";
      prestamo.pagos = [...(prestamo.pagos ?? []), { id: Date.now(), prestamoId: dto.prestamoId, monto: dto.monto, fecha: new Date().toISOString(), notas: dto.notas }];
      prestamo.updatedAt = new Date().toISOString();
      return prestamo;
    }
    const { data } = await api.post<Prestamo>(`/prestamos/${dto.prestamoId}/pagos`, dto);
    return data;
  },

  async eliminar(id: number): Promise<void> {
    if (USE_MOCKS) { await delay(); const idx = mockPrestamos.findIndex((p) => p.id === id); if (idx !== -1) mockPrestamos.splice(idx, 1); return; }
    await api.delete(`/prestamos/${id}`);
  },
};
