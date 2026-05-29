export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  productosCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoriaDTO {
  nombre: string;
  descripcion?: string;
}

export interface UpdateCategoriaDTO extends Partial<CreateCategoriaDTO> {
  id: number;
}
