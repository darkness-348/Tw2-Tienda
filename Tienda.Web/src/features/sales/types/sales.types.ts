export interface VentaItem {
  productoId: number;
  nombre?: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Venta {
  id: number;
  numero: string;
  cliente: { id?: number; nombre: string; email?: string; telefono?: string };
  items: VentaItem[];
  subtotal: number;
  impuesto: number;
  total: number;
  metodoPagoId: number;
  estado: "pendiente" | "pagado" | "cancelado";
  fechaVenta: string;
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVentaDTO {
  clienteNombre: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  items: VentaItem[];
  metodoPagoId: number;
  notas?: string;
}

export interface UpdateVentaDTO extends Partial<CreateVentaDTO> { id: number }

export interface VentasFilter {
  estado?: "pendiente" | "pagado" | "cancelado";
  fechaDesde?: string;
  fechaHasta?: string;
  clienteNombre?: string;
  metodoPagoId?: number;
  page?: number;
  limit?: number;
}

export interface VentasListResponse {
  data: Venta[];
  total: number;
  page: number;
  limit: number;
}

export interface DailyReportResponse {
  fecha: string;
  totalVentas: number;
  totalArticulos: number;
  ingresoTotal: number;
  metodoPagos: Array<{ nombre: string; cantidad: number; monto: number }>;
}
