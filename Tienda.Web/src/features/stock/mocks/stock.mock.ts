import type { MovimientoStock } from "../types/stock.types";

export const mockMovimientos: MovimientoStock[] = [
  { id: 1, productoId: 1, nombreProducto: "Arroz Grano de Oro 1kg", tipo: "entrada", cantidad: 100, razon: "Compra a proveedor — Distribuidora Norte", operarioId: 3, fecha: "2026-05-20T10:00:00Z", createdAt: "2026-05-20T10:00:00Z" },
  { id: 2, productoId: 1, nombreProducto: "Arroz Grano de Oro 1kg", tipo: "salida", cantidad: 15, razon: "Venta", operarioId: 2, fecha: "2026-05-25T14:30:00Z", createdAt: "2026-05-25T14:30:00Z" },
  { id: 3, productoId: 2, nombreProducto: "Coca-Cola 2L", tipo: "entrada", cantidad: 50, razon: "Reposición urgente", operarioId: 3, fecha: "2026-05-26T09:15:00Z", createdAt: "2026-05-26T09:15:00Z" },
  { id: 4, productoId: 2, nombreProducto: "Coca-Cola 2L", tipo: "ajuste", cantidad: -2, razon: "Productos defectuosos", operarioId: 3, fecha: "2026-05-27T11:00:00Z", notas: "2 botellas rotas en traslado", createdAt: "2026-05-27T11:00:00Z" },
  { id: 5, productoId: 7, nombreProducto: "Yogur Bati 1L", tipo: "salida", cantidad: 3, razon: "Producto vencido — retirada de góndola", operarioId: 3, fecha: "2026-05-28T08:00:00Z", notas: "Productos vencidos 20/05", createdAt: "2026-05-28T08:00:00Z" },
  { id: 6, productoId: 4, nombreProducto: "Aceite Fino 1L", tipo: "entrada", cantidad: 60, razon: "Compra mensual", operarioId: 3, fecha: "2026-05-28T15:00:00Z", createdAt: "2026-05-28T15:00:00Z" },
];
