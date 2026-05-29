import type { MetodoPago } from "../types/payments.types";

export const mockMetodosPago: MetodoPago[] = [
  { id: 1, nombre: "Efectivo", descripcion: "Pago en efectivo", activo: true, comision: 0, requiereNumero: false, requiereNombreE: false, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: 2, nombre: "Tarjeta Débito", descripcion: "Pago con tarjeta de débito", activo: true, comision: 1.5, requiereNumero: true, requiereNombreE: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: 3, nombre: "Tarjeta Crédito", descripcion: "Pago con tarjeta de crédito", activo: true, comision: 2.5, requiereNumero: true, requiereNombreE: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: 4, nombre: "Transferencia", descripcion: "Transferencia bancaria", activo: true, comision: 0, requiereNumero: false, requiereNombreE: false, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-01-01T00:00:00Z" },
  { id: 5, nombre: "QR", descripcion: "Pago mediante código QR", activo: false, comision: 1.8, requiereNumero: false, requiereNombreE: false, createdAt: "2024-02-15T10:00:00Z", updatedAt: "2024-05-20T14:30:00Z" },
];
