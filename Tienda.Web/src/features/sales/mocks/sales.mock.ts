import type { Venta, DailyReportResponse } from "../types/sales.types";

export const mockVentas: Venta[] = [
  { id: 1, numero: "V-2026-00001", cliente: { id: 101, nombre: "Juan Pérez", email: "juan@example.com", telefono: "+591 7654321" }, items: [{ productoId: 1, nombre: "Arroz Grano de Oro 1kg", cantidad: 4, precioUnitario: 12.5, subtotal: 50 }, { productoId: 2, nombre: "Coca-Cola 2L", cantidad: 3, precioUnitario: 12, subtotal: 36 }], subtotal: 86, impuesto: 8.6, total: 94.6, metodoPagoId: 1, estado: "pagado", fechaVenta: "2026-05-28T10:30:00Z", notas: "Cliente frecuente", createdAt: "2026-05-28T10:30:00Z", updatedAt: "2026-05-28T10:30:00Z" },
  { id: 2, numero: "V-2026-00002", cliente: { nombre: "María García", email: "maria@example.com" }, items: [{ productoId: 3, nombre: "Leche PIL 1L", cantidad: 5, precioUnitario: 7.5, subtotal: 37.5 }, { productoId: 4, nombre: "Aceite Fino 1L", cantidad: 2, precioUnitario: 18.5, subtotal: 37 }], subtotal: 74.5, impuesto: 7.45, total: 81.95, metodoPagoId: 2, estado: "pagado", fechaVenta: "2026-05-28T14:15:00Z", createdAt: "2026-05-28T14:15:00Z", updatedAt: "2026-05-28T14:15:00Z" },
  { id: 3, numero: "V-2026-00003", cliente: { nombre: "Carlos López" }, items: [{ productoId: 6, nombre: "Detergente Ola 1kg", cantidad: 2, precioUnitario: 26, subtotal: 52 }, { productoId: 5, nombre: "Pan Molde Grande", cantidad: 1, precioUnitario: 12.5, subtotal: 12.5 }], subtotal: 64.5, impuesto: 6.45, total: 70.95, metodoPagoId: 4, estado: "pendiente", fechaVenta: "2026-05-29T09:00:00Z", createdAt: "2026-05-29T09:00:00Z", updatedAt: "2026-05-29T09:00:00Z" },
];

export const mockDailyReport: DailyReportResponse = {
  fecha: "2026-05-29",
  totalVentas: 3,
  totalArticulos: 17,
  ingresoTotal: 247.5,
  metodoPagos: [
    { nombre: "Efectivo", cantidad: 1, monto: 94.6 },
    { nombre: "Tarjeta Débito", cantidad: 1, monto: 81.95 },
    { nombre: "Transferencia", cantidad: 1, monto: 70.95 },
  ],
};
