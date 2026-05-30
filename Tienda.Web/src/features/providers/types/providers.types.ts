export interface Proveedor {
  id: number;
  nombre: string;
  contacto?: string;
  direccion: string;
  telefono: string;
  email?: string;
  codigoProveedor?: string;
  relacion?: string; // "Distribuidor", "Fabricante", "Importador"
  estado: "Activo" | "Inactivo";
  calificacion?: number; // 1-5
  productosCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProveedorDTO {
  nombre: string;
  contacto?: string;
  direccion: string;
  telefono: string;
  email?: string;
  codigoProveedor?: string;
  relacion?: string;
}

export interface UpdateProveedorDTO extends Partial<CreateProveedorDTO> {
  id: number;
}

export interface CalificacionProveedorDTO {
  proveedorId: number;
  calificacion: number;
  comentario?: string;
}

export interface ProveedoresFilter {
  nombre?: string;
  estado?: string;
  relacion?: string;
}
