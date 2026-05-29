export interface MetodoPago {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  comision?: number;
  requiereNumero?: boolean;
  requiereNombreE?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMetodoPagoDTO {
  nombre: string;
  descripcion?: string;
  comision?: number;
  requiereNumero?: boolean;
  requiereNombreE?: boolean;
}

export interface UpdateMetodoPagoDTO extends Partial<CreateMetodoPagoDTO> {
  id: number;
}

export interface PagoRegistro {
  id: number;
  ventaId: number;
  metodoPagoId: number;
  monto: number;
  fechaPago: string;
  estado: "pendiente" | "procesado" | "fallido";
  referencia?: string;
  detalles?: Record<string, unknown>;
}
