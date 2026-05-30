import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { Categoria, CreateCategoriaDTO, UpdateCategoriaDTO } from "../types/categories.types";
import { mockCategorias } from "../mocks/categories.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const categoriesService = {
  async listar(): Promise<Categoria[]> {
    if (USE_MOCKS) { await delay(); return [...mockCategorias]; }
    // GET /api/Category
    const { data } = await api.get<Categoria[]>("/Category");
    return data;
  },
  async obtenerPorId(id: number): Promise<Categoria> {
    if (USE_MOCKS) {
      await delay();
      const cat = mockCategorias.find((c) => c.id === id);
      if (!cat) throw new Error(`Categoría ${id} no encontrada`);
      return cat;
    }
    // No hay endpoint por id en el backend — listar y filtrar
    const { data } = await api.get<Categoria[]>("/Category");
    const cat = data.find((c: Categoria) => c.id === id);
    if (!cat) throw new Error(`Categoría ${id} no encontrada`);
    return cat;
  },
  async crear(dto: CreateCategoriaDTO): Promise<Categoria> {
    if (USE_MOCKS) {
      await delay();
      const newCat: Categoria = { id: Math.max(...mockCategorias.map((c) => c.id), 0) + 1, ...dto, activo: true, productosCount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      mockCategorias.push(newCat);
      return newCat;
    }
    // POST /api/Category  { Name: string }
    const { data } = await api.post<Categoria>("/Category", { Name: dto.nombre });
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
    // PUT /api/Category/{currentName}  { Name: string }
    const { data } = await api.put<Categoria>(`/Category/${encodeURIComponent(dto.nombre ?? '')}`, { Name: dto.nombre });
    return data;
  },
  async eliminar(id: number): Promise<void> {
    if (USE_MOCKS) { await delay(); const idx = mockCategorias.findIndex((c) => c.id === id); if (idx !== -1) mockCategorias.splice(idx, 1); return; }
    // DELETE /api/Category/{categoryName} — need name, find from mock or use id as fallback
    const cat = mockCategorias.find((c) => c.id === id);
    await api.delete(`/Category/${encodeURIComponent(cat?.nombre ?? String(id))}`);
  },
  async toggleActivo(id: number, activo: boolean): Promise<Categoria> {
    if (USE_MOCKS) {
      await delay();
      const cat = mockCategorias.find((c) => c.id === id);
      if (!cat) throw new Error(`Categoría ${id} no encontrada`);
      cat.activo = activo; cat.updatedAt = new Date().toISOString();
      return cat;
    }
    // No hay endpoint de toggle en el backend — usar delete/add como proxy
    const { data } = await api.patch<Categoria>(`/Category/${id}/estado`, { activo });
    return data;
  },
};
