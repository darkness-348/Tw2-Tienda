import type { VentaReporte, CompraReporte, EstadisticasVentas, EstadisticasCompras, PeriodoReporte } from '../types';

const VENTAS_DATA: Record<PeriodoReporte, VentaReporte[]> = {
  diario: [
    { Id: 1, FechaVenta: '2026-05-28T09:15:00', Total: 87.50, Estado: 'Completada', Cajero: 'Elena Choque', Detalles: [{ ProductoId: 1, NombreProducto: 'Arroz Grano de Oro 1kg', Precio: 12.50, Cantidad: 3 }, { ProductoId: 2, NombreProducto: 'Coca-Cola 2L', Precio: 12.00, Cantidad: 2 }] },
    { Id: 2, FechaVenta: '2026-05-28T10:30:00', Total: 55.00, Estado: 'Completada', Cajero: 'Diego Fernández', Detalles: [{ ProductoId: 3, NombreProducto: 'Leche PIL Entera 1L', Precio: 7.50, Cantidad: 4 }, { ProductoId: 4, NombreProducto: 'Pan Molde', Precio: 12.50, Cantidad: 1 }] },
    { Id: 3, FechaVenta: '2026-05-28T11:45:00', Total: 130.00, Estado: 'Completada', Cajero: 'Elena Choque', Detalles: [{ ProductoId: 1, NombreProducto: 'Arroz Grano de Oro 1kg', Precio: 12.50, Cantidad: 5 }, { ProductoId: 5, NombreProducto: 'Aceite Fino 1L', Precio: 18.50, Cantidad: 3 }] },
    { Id: 4, FechaVenta: '2026-05-28T14:00:00', Total: 62.00, Estado: 'Completada', Cajero: 'Diego Fernández', Detalles: [{ ProductoId: 2, NombreProducto: 'Coca-Cola 2L', Precio: 12.00, Cantidad: 3 }, { ProductoId: 6, NombreProducto: 'Detergente Ola 1kg', Precio: 26.00, Cantidad: 1 }] },
  ],
  semanal: [
    { Id: 1, FechaVenta: '2026-05-22T09:00:00', Total: 820.00, Estado: 'Completada', Cajero: 'Elena Choque', Detalles: [{ ProductoId: 1, NombreProducto: 'Arroz Grano de Oro 1kg', Precio: 12.50, Cantidad: 30 }, { ProductoId: 2, NombreProducto: 'Coca-Cola 2L', Precio: 12.00, Cantidad: 18 }] },
    { Id: 2, FechaVenta: '2026-05-23T10:00:00', Total: 1150.00, Estado: 'Completada', Cajero: 'Diego Fernández', Detalles: [{ ProductoId: 3, NombreProducto: 'Leche PIL Entera 1L', Precio: 7.50, Cantidad: 60 }, { ProductoId: 5, NombreProducto: 'Aceite Fino 1L', Precio: 18.50, Cantidad: 20 }] },
    { Id: 3, FechaVenta: '2026-05-24T11:00:00', Total: 930.00, Estado: 'Completada', Cajero: 'Elena Choque', Detalles: [{ ProductoId: 1, NombreProducto: 'Arroz Grano de Oro 1kg', Precio: 12.50, Cantidad: 40 }, { ProductoId: 4, NombreProducto: 'Pan Molde', Precio: 12.50, Cantidad: 12 }] },
  ],
  mensual: [
    { Id: 1, FechaVenta: '2026-05-01T09:00:00', Total: 4820.00, Estado: 'Completada', Cajero: 'Elena Choque', Detalles: [{ ProductoId: 1, NombreProducto: 'Arroz Grano de Oro 1kg', Precio: 12.50, Cantidad: 180 }, { ProductoId: 2, NombreProducto: 'Coca-Cola 2L', Precio: 12.00, Cantidad: 95 }] },
    { Id: 2, FechaVenta: '2026-05-08T10:00:00', Total: 5100.00, Estado: 'Completada', Cajero: 'Diego Fernández', Detalles: [{ ProductoId: 3, NombreProducto: 'Leche PIL Entera 1L', Precio: 7.50, Cantidad: 280 }, { ProductoId: 5, NombreProducto: 'Aceite Fino 1L', Precio: 18.50, Cantidad: 70 }] },
    { Id: 3, FechaVenta: '2026-05-15T11:00:00', Total: 4900.00, Estado: 'Completada', Cajero: 'Elena Choque', Detalles: [{ ProductoId: 1, NombreProducto: 'Arroz Grano de Oro 1kg', Precio: 12.50, Cantidad: 200 }, { ProductoId: 4, NombreProducto: 'Pan Molde', Precio: 12.50, Cantidad: 60 }] },
  ],
};

const COMPRAS_DATA: Record<PeriodoReporte, CompraReporte[]> = {
  diario: [
    { Id: 1, FechaEntrega: '2026-05-28T08:00:00', Total: 1250.00, Estado: 'Recibido', Proveedor: 'Distribuidora Norte', Producto: 'Arroz Grano de Oro 1kg', Cantidad: 100, TipoMovimiento: 'Entrada' },
    { Id: 2, FechaEntrega: '2026-05-28T09:30:00', Total: 875.00, Estado: 'Recibido', Proveedor: 'Refrescos Bolivia', Producto: 'Coca-Cola 2L', Cantidad: 70, TipoMovimiento: 'Entrada' },
  ],
  semanal: [
    { Id: 1, FechaEntrega: '2026-05-22T08:00:00', Total: 3800.00, Estado: 'Recibido', Proveedor: 'Distribuidora Norte', Producto: 'Arroz Grano de Oro 1kg', Cantidad: 300, TipoMovimiento: 'Entrada' },
    { Id: 2, FechaEntrega: '2026-05-23T09:00:00', Total: 2100.00, Estado: 'Recibido', Proveedor: 'PIL Andina', Producto: 'Leche PIL Entera 1L', Cantidad: 280, TipoMovimiento: 'Entrada' },
    { Id: 3, FechaEntrega: '2026-05-25T10:00:00', Total: 1480.00, Estado: 'Pendiente', Proveedor: 'Refrescos Bolivia', Producto: 'Coca-Cola 2L', Cantidad: 120, TipoMovimiento: 'Entrada' },
  ],
  mensual: [
    { Id: 1, FechaEntrega: '2026-05-02T08:00:00', Total: 15200.00, Estado: 'Recibido', Proveedor: 'Distribuidora Norte', Producto: 'Arroz Grano de Oro 1kg', Cantidad: 1200, TipoMovimiento: 'Entrada' },
    { Id: 2, FechaEntrega: '2026-05-05T09:00:00', Total: 8400.00, Estado: 'Recibido', Proveedor: 'PIL Andina', Producto: 'Leche PIL Entera 1L', Cantidad: 1120, TipoMovimiento: 'Entrada' },
    { Id: 3, FechaEntrega: '2026-05-10T10:00:00', Total: 6200.00, Estado: 'Recibido', Proveedor: 'Refrescos Bolivia', Producto: 'Coca-Cola 2L', Cantidad: 500, TipoMovimiento: 'Entrada' },
    { Id: 4, FechaEntrega: '2026-05-18T11:00:00', Total: 4800.00, Estado: 'Recibido', Proveedor: 'FINO', Producto: 'Aceite Fino 1L', Cantidad: 260, TipoMovimiento: 'Entrada' },
  ],
};

export const reportsService = {
  getVentas: (periodo: PeriodoReporte): Promise<VentaReporte[]> =>
    Promise.resolve(VENTAS_DATA[periodo]),

  getCompras: (periodo: PeriodoReporte): Promise<CompraReporte[]> =>
    Promise.resolve(COMPRAS_DATA[periodo]),

  calcularEstadisticasVentas: (ventas: VentaReporte[]): EstadisticasVentas => {
    const totalVendido = ventas.reduce((acc, v) => acc + v.Total, 0);
    const cantidadTransacciones = ventas.length;
    const ticketPromedio = cantidadTransacciones > 0 ? totalVendido / cantidadTransacciones : 0;

    const productoCounts: Record<string, number> = {};
    ventas.forEach(v =>
      v.Detalles.forEach(d => {
        productoCounts[d.NombreProducto] = (productoCounts[d.NombreProducto] ?? 0) + d.Cantidad;
      })
    );
    const productoMasVendido = Object.entries(productoCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      totalVendido,
      cantidadTransacciones,
      ticketPromedio,
      productoMasVendido: productoMasVendido?.[0] ?? '—',
      cantidadProductoMasVendido: productoMasVendido?.[1] ?? 0,
    };
  },

  calcularEstadisticasCompras: (compras: CompraReporte[]): EstadisticasCompras => {
    const totalComprado = compras.reduce((acc, c) => acc + c.Total, 0);
    const cantidadMovimientos = compras.length;
    const promedioCompra = cantidadMovimientos > 0 ? totalComprado / cantidadMovimientos : 0;

    const productoCounts: Record<string, number> = {};
    compras.forEach(c => {
      productoCounts[c.Producto] = (productoCounts[c.Producto] ?? 0) + c.Cantidad;
    });
    const productoMasComprado = Object.entries(productoCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      totalComprado,
      cantidadMovimientos,
      promedioCompra,
      productoMasComprado: productoMasComprado?.[0] ?? '—',
      cantidadProductoMasComprado: productoMasComprado?.[1] ?? 0,
    };
  },
};
