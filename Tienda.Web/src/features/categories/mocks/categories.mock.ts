import type { Categoria } from "../types/categories.types";

export const mockCategorias: Categoria[] = [
  { id: 1, nombre: "Granos y Cereales", descripcion: "Arroz, quinua, trigo y similares", activo: true, productosCount: 12, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-05-28T10:00:00Z" },
  { id: 2, nombre: "Bebidas", descripcion: "Refrescos, jugos, agua y similares", activo: true, productosCount: 28, createdAt: "2024-01-05T00:00:00Z", updatedAt: "2024-05-28T10:00:00Z" },
  { id: 3, nombre: "Lácteos", descripcion: "Leche, yogur, queso y derivados", activo: true, productosCount: 15, createdAt: "2024-01-10T00:00:00Z", updatedAt: "2024-05-28T10:00:00Z" },
  { id: 4, nombre: "Aceites y Condimentos", descripcion: "Aceites vegetales, salsas y condimentos", activo: true, productosCount: 18, createdAt: "2024-01-15T00:00:00Z", updatedAt: "2024-05-28T10:00:00Z" },
  { id: 5, nombre: "Panadería", descripcion: "Pan, galletas y productos de panadería", activo: true, productosCount: 9, createdAt: "2024-02-01T00:00:00Z", updatedAt: "2024-05-15T14:30:00Z" },
  { id: 6, nombre: "Limpieza", descripcion: "Detergentes, jabones y artículos de limpieza", activo: true, productosCount: 22, createdAt: "2024-02-01T00:00:00Z", updatedAt: "2024-05-28T10:00:00Z" },
];
