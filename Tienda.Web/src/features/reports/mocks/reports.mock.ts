import type { ReporteVentas, ReporteCompras } from "../types/reports.types";

export const mockReporteVentas: Record<string, ReporteVentas> = {
  diario: {
    periodo: "diario", totalVentas: 334.5, cantidadTransacciones: 4, promedioVenta: 83.63,
    productoMasVendido: { productoId: 1, nombre: "Arroz Grano de Oro 1kg", cantidadVendida: 7, ingresoTotal: 87.5 },
    ventasPorDia: [{ fecha: "2026-05-29", totalVentas: 334.5, cantidadTransacciones: 4, ingresos: 334.5 }],
    topProductos: [
      { productoId: 1, nombre: "Arroz Grano de Oro 1kg", cantidadVendida: 7, ingresoTotal: 87.5 },
      { productoId: 4, nombre: "Aceite Fino 1L", cantidadVendida: 4, ingresoTotal: 74 },
      { productoId: 3, nombre: "Leche PIL Entera 1L", cantidadVendida: 5, ingresoTotal: 37.5 },
    ],
  },
  semanal: {
    periodo: "semanal", totalVentas: 2340, cantidadTransacciones: 28, promedioVenta: 83.57,
    productoMasVendido: { productoId: 1, nombre: "Arroz Grano de Oro 1kg", cantidadVendida: 45, ingresoTotal: 562.5 },
    ventasPorDia: [
      { fecha: "2026-05-23", totalVentas: 310, cantidadTransacciones: 4, ingresos: 310 },
      { fecha: "2026-05-24", totalVentas: 290, cantidadTransacciones: 3, ingresos: 290 },
      { fecha: "2026-05-25", totalVentas: 415, cantidadTransacciones: 5, ingresos: 415 },
      { fecha: "2026-05-26", totalVentas: 380, cantidadTransacciones: 4, ingresos: 380 },
      { fecha: "2026-05-27", totalVentas: 265, cantidadTransacciones: 3, ingresos: 265 },
      { fecha: "2026-05-28", totalVentas: 345, cantidadTransacciones: 5, ingresos: 345 },
      { fecha: "2026-05-29", totalVentas: 335, cantidadTransacciones: 4, ingresos: 335 },
    ],
    topProductos: [
      { productoId: 1, nombre: "Arroz Grano de Oro 1kg", cantidadVendida: 45, ingresoTotal: 562.5 },
      { productoId: 2, nombre: "Coca-Cola 2L", cantidadVendida: 38, ingresoTotal: 456 },
      { productoId: 4, nombre: "Aceite Fino 1L", cantidadVendida: 22, ingresoTotal: 407 },
    ],
  },
  mensual: {
    periodo: "mensual", totalVentas: 9820, cantidadTransacciones: 118, promedioVenta: 83.22,
    productoMasVendido: { productoId: 1, nombre: "Arroz Grano de Oro 1kg", cantidadVendida: 180, ingresoTotal: 2250 },
    ventasPorDia: [], // resumen en topProductos
    topProductos: [
      { productoId: 1, nombre: "Arroz Grano de Oro 1kg", cantidadVendida: 180, ingresoTotal: 2250 },
      { productoId: 2, nombre: "Coca-Cola 2L", cantidadVendida: 155, ingresoTotal: 1860 },
      { productoId: 4, nombre: "Aceite Fino 1L", cantidadVendida: 90, ingresoTotal: 1665 },
      { productoId: 3, nombre: "Leche PIL Entera 1L", cantidadVendida: 210, ingresoTotal: 1575 },
    ],
  },
};

export const mockReporteCompras: Record<string, ReporteCompras> = {
  diario: {
    periodo: "diario", totalComprado: 2125, cantidadMovimientos: 2, promedioCompra: 1062.5,
    productoMasComprado: { nombre: "Arroz Grano de Oro 1kg", cantidad: 100 },
    compras: [
      { fecha: "2026-05-29T08:00:00Z", proveedor: "Distribuidora Norte", producto: "Arroz Grano de Oro 1kg", cantidad: 100, total: 1250, estado: "Recibido" },
      { fecha: "2026-05-29T09:30:00Z", proveedor: "Refrescos Bolivia", producto: "Coca-Cola 2L", cantidad: 70, total: 875, estado: "Recibido" },
    ],
  },
  semanal: {
    periodo: "semanal", totalComprado: 11280, cantidadMovimientos: 6, promedioCompra: 1880,
    productoMasComprado: { nombre: "Arroz Grano de Oro 1kg", cantidad: 300 },
    compras: [
      { fecha: "2026-05-23T08:00:00Z", proveedor: "Distribuidora Norte", producto: "Arroz Grano de Oro 1kg", cantidad: 300, total: 3750, estado: "Recibido" },
      { fecha: "2026-05-24T09:00:00Z", proveedor: "PIL Andina", producto: "Leche PIL Entera 1L", cantidad: 280, total: 2100, estado: "Recibido" },
      { fecha: "2026-05-25T10:00:00Z", proveedor: "Refrescos Bolivia", producto: "Coca-Cola 2L", cantidad: 120, total: 1480, estado: "Pendiente" },
      { fecha: "2026-05-26T08:00:00Z", proveedor: "FINO", producto: "Aceite Fino 1L", cantidad: 80, total: 1120, estado: "Recibido" },
      { fecha: "2026-05-27T09:00:00Z", proveedor: "Bimbo Bolivia", producto: "Pan Molde Grande", cantidad: 60, total: 720, estado: "Recibido" },
      { fecha: "2026-05-28T10:00:00Z", proveedor: "Unilever Bolivia", producto: "Detergente Ola 1kg", cantidad: 50, total: 900, estado: "Recibido" },
    ],
  },
  mensual: {
    periodo: "mensual", totalComprado: 48500, cantidadMovimientos: 22, promedioCompra: 2204.5,
    productoMasComprado: { nombre: "Arroz Grano de Oro 1kg", cantidad: 1200 },
    compras: [
      { fecha: "2026-05-02T08:00:00Z", proveedor: "Distribuidora Norte", producto: "Arroz Grano de Oro 1kg", cantidad: 1200, total: 15000, estado: "Recibido" },
      { fecha: "2026-05-05T09:00:00Z", proveedor: "PIL Andina", producto: "Leche PIL Entera 1L", cantidad: 1120, total: 8400, estado: "Recibido" },
      { fecha: "2026-05-10T10:00:00Z", proveedor: "Refrescos Bolivia", producto: "Coca-Cola 2L", cantidad: 500, total: 6200, estado: "Recibido" },
      { fecha: "2026-05-18T11:00:00Z", proveedor: "FINO", producto: "Aceite Fino 1L", cantidad: 260, total: 4800, estado: "Recibido" },
    ],
  },
};
