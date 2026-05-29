export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioProveedor?: number;
  stock: number;
  stockMinimo: number;
  categoria: { id: number; nombre: string };
  proveedor: { id: number; nombre: string };
  codigoProducto: string;
  activo: boolean;
  fechaVencimiento?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  nombre: string;
  descripcion: string;
  precio: number;
  precioProveedor?: number;
  stock: number;
  stockMinimo: number;
  categoriaId: number;
  proveedorId: number;
  codigoProducto: string;
  fechaVencimiento?: string;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: number;
}

export interface ProductFilter {
  nombre?: string;
  categoriaId?: number;
  proveedorId?: number;
  precioMin?: number;
  precioMax?: number;
  stockMinimo?: boolean;
  vencidos?: boolean;
  activo?: boolean;
  page?: number;
  limit?: number;
}

export interface ProductsListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface TopProductosResponse {
  producto: Product;
  ventasTotal: number;
  ingresoTotal: number;
}
