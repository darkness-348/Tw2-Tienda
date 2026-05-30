export interface MovimientoStock {
  id: number;
  productoId: number;
  nombreProducto?: string;
  tipo: "entrada" | "salida" | "ajuste";
  cantidad: number;
  razon: string;
  operarioId?: number;
  fecha: string;
  notas?: string;
  createdAt: string;
}

export interface StockActual {
  productoId: number;
  cantidad: number;
  stockMinimo: number;
  ultimoMovimiento?: MovimientoStock;
}

export interface CreateMovimientoStockDTO {
  productoId: number;
  codigoBarras?: string;   // usado en real API
  tipo: "entrada" | "salida" | "ajuste";
  cantidad: number;
  razon: string;
  notas?: string;
  fecha?: string;          // FechaEntrega en real API
  descripcion?: string;    // Descripcion en real API
  total?: number;          // Total en real API
  unidades?: string;       // Unidades en real API
}

export interface MovimientosFilter {
  productoId?: number;
  tipo?: "entrada" | "salida" | "ajuste";
  fechaDesde?: string;
  fechaHasta?: string;
  page?: number;
  limit?: number;
}

export interface MovimientosResponse {
  data: MovimientoStock[];
  total: number;
  page: number;
  limit: number;
}
