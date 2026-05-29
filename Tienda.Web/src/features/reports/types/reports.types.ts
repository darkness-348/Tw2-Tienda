export type PeriodoReporte = "diario" | "semanal" | "mensual";
export type TipoReporte = "ventas" | "compras";

export interface ReporteVentasItem {
  fecha: string;
  totalVentas: number;
  cantidadTransacciones: number;
  ingresos: number;
}

export interface TopProducto {
  productoId: number;
  nombre: string;
  cantidadVendida: number;
  ingresoTotal: number;
}

export interface ReporteVentas {
  periodo: PeriodoReporte;
  totalVentas: number;
  cantidadTransacciones: number;
  promedioVenta: number;
  productoMasVendido: TopProducto;
  ventasPorDia: ReporteVentasItem[];
  topProductos: TopProducto[];
}

export interface ReporteComprasItem {
  fecha: string;
  proveedor: string;
  producto: string;
  cantidad: number;
  total: number;
  estado: string;
}

export interface ReporteCompras {
  periodo: PeriodoReporte;
  totalComprado: number;
  cantidadMovimientos: number;
  promedioCompra: number;
  productoMasComprado: { nombre: string; cantidad: number };
  compras: ReporteComprasItem[];
}
