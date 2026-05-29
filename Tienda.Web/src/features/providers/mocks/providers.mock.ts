import type { Proveedor } from "../types/providers.types";

export const mockProveedores: Proveedor[] = [
  { id: 1, nombre: "Distribuidora Norte", direccion: "Av. Montes 1234, El Alto", telefono: "71234567", relacion: "Distribuidor", estado: "Activo", calificacion: 5, productosCount: 18, createdAt: "2024-01-10T00:00:00Z", updatedAt: "2024-05-28T10:00:00Z" },
  { id: 2, nombre: "Refrescos Bolivia", direccion: "Zona Industrial, Cochabamba", telefono: "44556677", relacion: "Fabricante", estado: "Activo", calificacion: 4, productosCount: 8, createdAt: "2024-01-15T00:00:00Z", updatedAt: "2024-05-25T14:00:00Z" },
  { id: 3, nombre: "PIL Andina", direccion: "Av. Blanco Galindo Km 5, Cochabamba", telefono: "44112233", relacion: "Fabricante", estado: "Activo", calificacion: 5, productosCount: 12, createdAt: "2024-01-20T00:00:00Z", updatedAt: "2024-05-20T09:30:00Z" },
  { id: 4, nombre: "FINO", direccion: "Parque Industrial, Santa Cruz", telefono: "33445566", relacion: "Fabricante", estado: "Activo", calificacion: 4, productosCount: 6, createdAt: "2024-02-01T00:00:00Z", updatedAt: "2024-05-18T11:00:00Z" },
  { id: 5, nombre: "Bimbo Bolivia", direccion: "Av. 6 de Agosto, La Paz", telefono: "22334455", relacion: "Fabricante", estado: "Activo", calificacion: 3, productosCount: 5, createdAt: "2024-02-10T00:00:00Z", updatedAt: "2024-05-15T08:00:00Z" },
  { id: 6, nombre: "Unilever Bolivia", direccion: "Zona Sur, La Paz", telefono: "77889900", relacion: "Importador", estado: "Inactivo", calificacion: 2, productosCount: 10, createdAt: "2024-03-01T00:00:00Z", updatedAt: "2024-04-30T16:00:00Z" },
];
