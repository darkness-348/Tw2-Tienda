import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { MetodoPago, CreateMetodoPagoDTO, UpdateMetodoPagoDTO, PagoRegistro } from "../types/payments.types";
import { mockMetodosPago } from "../mocks/payments.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
let mockPagosRegistrados: PagoRegistro[] = [];

export const paymentsService = {
  async listar(): Promise<MetodoPago[]> {
    if (USE_MOCKS) { await delay(); return [...mockMetodosPago]; }
    const { data } = await api.get<MetodoPago[]>("/metodos-pago");
    return data;
  },

  async obtenerPorId(id: number): Promise<MetodoPago> {
    if (USE_MOCKS) {
      await delay();
      const metodo = mockMetodosPago.find((m) => m.id === id);
      if (!metodo) throw new Error(`Método de pago ${id} no encontrado`);
      return metodo;
    }
    const { data } = await api.get<MetodoPago>(`/metodos-pago/${id}`);
    return data;
  },

  async crear(dto: CreateMetodoPagoDTO): Promise<MetodoPago> {
    if (USE_MOCKS) {
      await delay();
      const newMetodo: MetodoPago = {
        id: Math.max(...mockMetodosPago.map((m) => m.id), 0) + 1,
        ...dto,
        activo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockMetodosPago.push(newMetodo);
      return newMetodo;
    }
    const { data } = await api.post<MetodoPago>("/metodos-pago", dto);
    return data;
  },

  async actualizar(dto: UpdateMetodoPagoDTO): Promise<MetodoPago> {
    if (USE_MOCKS) {
      await delay();
      const idx = mockMetodosPago.findIndex((m) => m.id === dto.id);
      if (idx === -1) throw new Error(`Método de pago ${dto.id} no encontrado`);
      mockMetodosPago[idx] = { ...mockMetodosPago[idx], ...dto, updatedAt: new Date().toISOString() };
      return mockMetodosPago[idx];
    }
    const { data } = await api.put<MetodoPago>(`/metodos-pago/${dto.id}`, dto);
    return data;
  },

  async toggleActivo(id: number, activo: boolean): Promise<MetodoPago> {
    if (USE_MOCKS) {
      await delay();
      const metodo = mockMetodosPago.find((m) => m.id === id);
      if (!metodo) throw new Error(`Método de pago ${id} no encontrado`);
      metodo.activo = activo;
      metodo.updatedAt = new Date().toISOString();
      return metodo;
    }
    const { data } = await api.patch<MetodoPago>(`/metodos-pago/${id}/estado`, { activo });
    return data;
  },

  async registrarPago(ventaId: number, metodoPagoId: number, monto: number, detalles?: Record<string, unknown>): Promise<PagoRegistro> {
    if (USE_MOCKS) {
      await delay();
      const pago: PagoRegistro = {
        id: Math.max(...mockPagosRegistrados.map((p) => p.id), 0) + 1,
        ventaId, metodoPagoId, monto,
        fechaPago: new Date().toISOString(),
        estado: "procesado",
        referencia: `REF-${Date.now()}`,
        detalles,
      };
      mockPagosRegistrados.push(pago);
      return pago;
    }
    const { data } = await api.post<PagoRegistro>("/pagos", { ventaId, metodoPagoId, monto, detalles });
    return data;
  },
};
