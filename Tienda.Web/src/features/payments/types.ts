export interface MetodoPago {
  Id: number;
  Nombre: string;
  Descripcion: string;
  Estado: 'Activo' | 'Inactivo';
}

export type MetodoPagoFormData = Omit<MetodoPago, 'Id'>;
