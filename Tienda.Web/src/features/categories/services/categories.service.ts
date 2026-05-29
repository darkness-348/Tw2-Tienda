import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { Categoria, CreateCategoriaDTO, UpdateCategoriaDTO } from "../types/categories.types";
import { mockCategorias } from "../mocks/categories.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const categoriesService = {
  async listar(): Promise<Categoria[]> {
    if (USE_MOCKS) { await delay(); return [...mockCategorias]; }
    const { data } = await api.get<Categoria[]>("/categorias");
    return data;
  },
  async obtenerPorId(id: number): Promise<Categoria> {
    if (USE_MOCKS) {
      await delay();
      const cat = mockCategorias.find((c) => c.id === id);
      if (!cat) throw new Error(`Categoría ${id} no encontrada`);
      return cat;
    }
    const { data } = await api.get<Categoria>(`/categorias/${id}`);
    return data;
  },
  async crear(dto: CreateCategoriaDTO): Promise<Categoria> {
    if (USE_MOCKS) {
      await delay();
      const newCat: Categoria = { id: Math.max(...mockCategorias.map((c) => c.id), 0) + 1, ...dto, activo: true, productosCount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      mockCategorias.push(newCat);
      return newCat;
    }
    const { data } = await api.post<Categoria>("/categorias", dto);
    return data;
  },
  async actualizar(dto: UpdateCategoriaDTO): Promise<Categoria> {
    if (USE_MOCKS) {
      await delay();
      const idx = mockCategorias.findIndex((c) => c.id === dto.id);
      if (idx === -1) throw new Error(`Categoría ${dto.id} no encontrada`);
      mockCategorias[idx] = { ...mockCategorias[idx], ...dto, updatedAt: new Date().toISOString() };
      return mockCategorias[idx];
    }
    const { data } = await api.put<Categoria>(`/categorias/${dto.id}`, dto);
    return data;
  },
  async eliminar(id: number): Promise<void> {
    if (USE_MOCKS) { await delay(); const idx = mockCategorias.findIndex((c) => c.id === id); if (idx !== -1) mockCategorias.splice(idx, 1); return; }
    await api.delete(`/categorias/${id}`);
  },
  async toggleActivo(id: number, activo: boolean): Promise<Categoria> {
    if (USE_MOCKS) {
      await delay();
      const cat = mockCategorias.find((c) => c.id === id);
      if (!cat) throw new Error(`Categoría ${id} no encontrada`);
      cat.activo = activo; cat.updatedAt = new Date().toISOString();
      return cat;
    }
    const { data } = await api.patch<Categoria>(`/categorias/${id}/estado`, { activo });
    return data;
  },
};
