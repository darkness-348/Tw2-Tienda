import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ProductFilter,
  ProductsListResponse,
  TopProductosResponse,
} from "../types/products.types";
import { mockProducts, mockTopProducts } from "../mocks/products.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const filterProducts = (filter: ProductFilter = {}): Product[] => {
  let results = [...mockProducts];
  if (filter.nombre) results = results.filter((p) => p.nombre.toLowerCase().includes(filter.nombre!.toLowerCase()));
  if (filter.categoriaId) results = results.filter((p) => p.categoria.id === filter.categoriaId);
  if (filter.proveedorId) results = results.filter((p) => p.proveedor.id === filter.proveedorId);
  if (filter.precioMin !== undefined) results = results.filter((p) => p.precio >= filter.precioMin!);
  if (filter.precioMax !== undefined) results = results.filter((p) => p.precio <= filter.precioMax!);
  if (filter.stockMinimo) results = results.filter((p) => p.stock <= p.stockMinimo);
  if (filter.vencidos) {
    const now = new Date();
    results = results.filter((p) => p.fechaVencimiento && new Date(p.fechaVencimiento) < now);
  }
  if (filter.activo !== undefined) results = results.filter((p) => p.activo === filter.activo);
  return results;
};

export const productsService = {
  async listar(filter: ProductFilter = {}): Promise<ProductsListResponse> {
    if (USE_MOCKS) {
      await delay();
      const filtered = filterProducts(filter);
      const page = filter.page || 1;
      const limit = filter.limit || 10;
      return { data: filtered.slice((page - 1) * limit, page * limit), total: filtered.length, page, limit };
    }
    // GET /api/Productos/Obtener-Productos
    const { data } = await api.get<Product[]>("/Productos/Obtener-Productos");
    return { data, total: data.length, page: 1, limit: data.length };
  },

  async obtenerPorId(id: number): Promise<Product> {
    if (USE_MOCKS) {
      await delay();
      const product = mockProducts.find((p) => p.id === id);
      if (!product) throw new Error(`Producto ${id} no encontrado`);
      return product;
    }
    // GET /api/Productos/Stock/{codigoBarras}
    const { data } = await api.get<Product>(`/Productos/Stock/${id}`);
    return data;
  },

  async crear(dto: CreateProductDTO): Promise<Product> {
    if (USE_MOCKS) {
      await delay();
      const newProduct: Product = {
        id: Math.max(...mockProducts.map((p) => p.id), 0) + 1,
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        precio: dto.precio,
        precioProveedor: dto.precioProveedor,
        stock: dto.stock,
        stockMinimo: dto.stockMinimo,
        categoria: { id: dto.categoriaId, nombre: "Nueva Categoría" },
        proveedor: { id: dto.proveedorId, nombre: "Proveedor" },
        codigoProducto: dto.codigoProducto,
        fechaVencimiento: dto.fechaVencimiento,
        activo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockProducts.push(newProduct);
      return newProduct;
    }
    // POST /api/Productos/Crear-Producto
    const { data } = await api.post<Product>("/Productos/Crear-Producto", {
      CodigoProvedor: dto.proveedorId?.toString(),
      Categoria: dto.categoriaId?.toString(),
      Nombre: dto.nombre,
      Descripcion: dto.descripcion,
      FechaVencimiento: dto.fechaVencimiento,
      CodigoBarras: dto.codigoProducto,
      PrecioCompra: dto.precioProveedor ?? dto.precio,
    });
    return data;
  },

  async actualizar(dto: UpdateProductDTO): Promise<Product> {
    if (USE_MOCKS) {
      await delay();
      const idx = mockProducts.findIndex((p) => p.id === dto.id);
      if (idx === -1) throw new Error(`Producto ${dto.id} no encontrado`);
      mockProducts[idx] = { ...mockProducts[idx], ...dto, updatedAt: new Date().toISOString() };
      return mockProducts[idx];
    }
    // PUT /api/Productos/Actualizar-Producto/{codigoBarras}
    const { data } = await api.put<Product>(`/Productos/Actualizar-Producto/${dto.codigoProducto ?? dto.id}`, {
      Nombre: dto.nombre,
      Descripcion: dto.descripcion,
      FechaVencimiento: dto.fechaVencimiento,
    });
    return data;
  },

  async eliminar(id: number): Promise<void> {
    if (USE_MOCKS) {
      await delay();
      const idx = mockProducts.findIndex((p) => p.id === id);
      if (idx !== -1) mockProducts.splice(idx, 1);
      return;
    }
    // DELETE /api/Productos/Eliminar-Producto/{codigoBarras}
    const product = mockProducts.find((p) => p.id === id);
    await api.delete(`/Productos/Eliminar-Producto/${product?.codigoProducto ?? id}`);
  },

  async toggleActivo(id: number, activo: boolean): Promise<Product> {
    if (USE_MOCKS) {
      await delay();
      const product = mockProducts.find((p) => p.id === id);
      if (!product) throw new Error(`Producto ${id} no encontrado`);
      product.activo = activo;
      product.updatedAt = new Date().toISOString();
      return product;
    }
    // PUT /api/Productos/Actualizar-Producto/{codigoBarras} con EstadoProducto
    const product = mockProducts.find((p) => p.id === id);
    const { data } = await api.put<Product>(`/Productos/Actualizar-Producto/${product?.codigoProducto ?? id}`, {
      EstadoProducto: activo ? "Bueno" : "Caducado",
    });
    return data;
  },

  async obtenerMasVendidos(): Promise<TopProductosResponse[]> {
    if (USE_MOCKS) { await delay(); return mockTopProducts; }
    // No hay endpoint específico; usar inventario como proxy
    const { data } = await api.get<TopProductosResponse[]>("/Productos/Inventario");
    return data;
  },

  async obtenerVencidos(): Promise<Product[]> {
    if (USE_MOCKS) {
      await delay();
      const now = new Date();
      return mockProducts.filter((p) => p.fechaVencimiento && new Date(p.fechaVencimiento) < now);
    }
    // Filtrar en cliente desde el inventario
    const { data } = await api.get<Product[]>("/Productos/Obtener-Productos");
    return data.filter((p: Product) => p.fechaVencimiento && new Date(p.fechaVencimiento) < new Date());
  },

  async obtenerStockBajo(stockMinimo?: number): Promise<Product[]> {
    if (USE_MOCKS) {
      await delay();
      return mockProducts.filter((p) => p.stock <= (stockMinimo ?? p.stockMinimo));
    }
    const { data } = await api.get<Product[]>("/Productos/Obtener-Productos");
    return data.filter((p: Product) => p.stock <= (stockMinimo ?? p.stockMinimo));
  },
};
