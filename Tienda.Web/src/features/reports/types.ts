export type PeriodoReporte = 'diario' | 'semanal' | 'mensual';
export type TipoReporte = 'ventas' | 'compras';

export interface DetalleVenta {
  ProductoId: number;
  NombreProducto: string;
  Precio: number;
  Cantidad: number;
}

export interface VentaReporte {
  Id: number;
  FechaVenta: string;
  Total: number;
  Estado: string;
  Cajero: string;
  Detalles: DetalleVenta[];
}

export interface CompraReporte {
  Id: number;
  FechaEntrega: string;
  Total: number;
  Estado: string;
  Proveedor: string;
  Producto: string;
  Cantidad: number;
  TipoMovimiento: string;
}

export interface EstadisticasVentas {
  totalVendido: number;
  cantidadTransacciones: number;
  ticketPromedio: number;
  productoMasVendido: string;
  cantidadProductoMasVendido: number;
}

export interface EstadisticasCompras {
  totalComprado: number;
  cantidadMovimientos: number;
  promedioCompra: number;
  productoMasComprado: string;
  cantidadProductoMasComprado: number;
}
