import type { Prestamo } from "../types/loans.types";

export const mockPrestamos: Prestamo[] = [
  { id: 1, clienteNombre: "Ana Torres", clienteTelefono: "78901234", monto: 200, saldoPendiente: 150, estado: "activo", fechaPrestamo: "2026-05-01T10:00:00Z", fechaVencimiento: "2026-06-01T10:00:00Z", notas: "Pago parcial recibido", pagos: [{ id: 1, prestamoId: 1, monto: 50, fecha: "2026-05-15T10:00:00Z" }], createdAt: "2026-05-01T10:00:00Z", updatedAt: "2026-05-15T10:00:00Z" },
  { id: 2, clienteNombre: "Luis Quispe", clienteTelefono: "67890123", monto: 350, saldoPendiente: 350, estado: "vencido", fechaPrestamo: "2026-04-01T10:00:00Z", fechaVencimiento: "2026-05-01T10:00:00Z", pagos: [], createdAt: "2026-04-01T10:00:00Z", updatedAt: "2026-04-01T10:00:00Z" },
  { id: 3, clienteNombre: "Carla Ramos", clienteTelefono: "56789012", monto: 100, saldoPendiente: 0, estado: "pagado", fechaPrestamo: "2026-04-15T10:00:00Z", fechaVencimiento: "2026-05-15T10:00:00Z", pagos: [{ id: 2, prestamoId: 3, monto: 100, fecha: "2026-05-10T10:00:00Z", notas: "Cancelado completamente" }], createdAt: "2026-04-15T10:00:00Z", updatedAt: "2026-05-10T10:00:00Z" },
];
