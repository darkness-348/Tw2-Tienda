import type { Notificacion } from "../types/notifications.types";

export const mockNotificaciones: Notificacion[] = [
  { id: 1, tipo: "stock_bajo", titulo: "Stock Bajo — Coca-Cola 2L", mensaje: "Quedan 2 unidades. Mínimo requerido: 15.", leida: false, fechaCreacion: "2026-05-29T08:00:00Z", datos: { productoId: 2, stock: 2, minimo: 15 } },
  { id: 2, tipo: "stock_bajo", titulo: "Stock Bajo — Leche PIL Entera 1L", mensaje: "Sin unidades en stock. Mínimo requerido: 10.", leida: false, fechaCreacion: "2026-05-29T08:05:00Z", datos: { productoId: 3, stock: 0, minimo: 10 } },
  { id: 3, tipo: "producto_vencido", titulo: "Producto Vencido — Yogur Bati 1L", mensaje: "Venció el 20/05/2026. Retirar de góndola.", leida: false, fechaCreacion: "2026-05-28T07:00:00Z", datos: { productoId: 7, fechaVencimiento: "2026-05-20" } },
  { id: 4, tipo: "venta", titulo: "Venta Pendiente de Confirmación", mensaje: "V-2026-00003 de Carlos López por Bs 70.95 pendiente.", leida: true, fechaCreacion: "2026-05-29T09:00:00Z", datos: { ventaId: 3 } },
  { id: 5, tipo: "sistema", titulo: "Cierre de Caja Pendiente", mensaje: "No se ha realizado el cierre del día de ayer.", leida: true, fechaCreacion: "2026-05-29T06:00:00Z" },
];
