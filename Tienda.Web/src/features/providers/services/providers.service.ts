import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { Proveedor, CreateProveedorDTO, UpdateProveedorDTO, CalificacionProveedorDTO, ProveedoresFilter } from "../types/providers.types";
import { mockProveedores } from "../mocks/providers.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const providersService = {
  async listar(filter: ProveedoresFilter = {}): Promise<Proveedor[]> {
    if (USE_MOCKS) {
      await delay();
      let r = [...mockProveedores];
      if (filter.nombre) r = r.filter((p) => p.nombre.toLowerCase().includes(filter.nombre!.toLowerCase()));
      if (filter.estado) r = r.filter((p) => p.estado === filter.estado);
      if (filter.relacion) r = r.filter((p) => p.relacion === filter.relacion);
      return r;
    }
    const { data } = await api.get<Proveedor[]>("/proveedores", { params: filter });
    return data;
  },

  async obtenerPorId(id: number): Promise<Proveedor> {
    if (USE_MOCKS) {
      await delay();
      const p = mockProveedores.find((p) => p.id === id);
      if (!p) throw new Error(`Proveedor ${id} no encontrado`);
      return p;
    }
    const { data } = await api.get<Proveedor>(`/proveedores/${id}`);
    return data;
  },

  async crear(dto: CreateProveedorDTO): Promise<Proveedor> {
    if (USE_MOCKS) {
      await delay();
      const newProv: Proveedor = { id: Math.max(...mockProveedores.map((p) => p.id), 0) + 1, ...dto, estado: "Activo", calificacion: 0, productosCount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      mockProveedores.push(newProv);
      return newProv;
    }
    const { data } = await api.post<Proveedor>("/proveedores", dto);
    return data;
  },

  async actualizar(dto: UpdateProveedorDTO): Promise<Proveedor> {
    if (USE_MOCKS) {
      await delay();
      const idx = mockProveedores.findIndex((p) => p.id === dto.id);
      if (idx === -1) throw new Error(`Proveedor ${dto.id} no encontrado`);
      mockProveedores[idx] = { ...mockProveedores[idx], ...dto, updatedAt: new Date().toISOString() };
      return mockProveedores[idx];
    }
    const { data } = await api.put<Proveedor>(`/proveedores/${dto.id}`, dto);
    return data;
  },

  async toggleEstado(id: number): Promise<Proveedor> {
    if (USE_MOCKS) {
      await delay();
      const prov = mockProveedores.find((p) => p.id === id);
      if (!prov) throw new Error(`Proveedor ${id} no encontrado`);
      prov.estado = prov.estado === "Activo" ? "Inactivo" : "Activo";
      prov.updatedAt = new Date().toISOString();
      return prov;
    }
    const { data } = await api.patch<Proveedor>(`/proveedores/${id}/estado`, {});
    return data;
  },

  async calificar(dto: CalificacionProveedorDTO): Promise<Proveedor> {
    if (USE_MOCKS) {
      await delay();
      const prov = mockProveedores.find((p) => p.id === dto.proveedorId);
      if (!prov) throw new Error(`Proveedor ${dto.proveedorId} no encontrado`);
      prov.calificacion = dto.calificacion;
      prov.updatedAt = new Date().toISOString();
      return prov;
    }
    const { data } = await api.post<Proveedor>(`/proveedores/${dto.proveedorId}/calificar`, dto);
    return data;
  },
};
