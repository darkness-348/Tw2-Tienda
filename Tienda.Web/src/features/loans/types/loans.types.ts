export interface Prestamo {
  id: number;
  clienteNombre: string;
  clienteTelefono?: string;
  monto: number;
  saldoPendiente: number;
  estado: "activo" | "pagado" | "vencido";
  fechaPrestamo: string;
  fechaVencimiento: string;
  notas?: string;
  pagos?: PagoPrestamo[];
  createdAt: string;
  updatedAt: string;
}

export interface PagoPrestamo {
  id: number;
  prestamoId: number;
  monto: number;
  fecha: string;
  notas?: string;
}

export interface CreatePrestamoDTO {
  clienteNombre: string;
  clienteTelefono?: string;
  monto: number;
  fechaVencimiento: string;
  notas?: string;
}

export interface RegistrarPagoPrestamoDTO {
  prestamoId: number;
  monto: number;
  notas?: string;
}

export interface PrestamosFilter {
  estado?: "activo" | "pagado" | "vencido";
  clienteNombre?: string;
}
