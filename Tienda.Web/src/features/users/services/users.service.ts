import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { Usuario, CreateUsuarioDTO, UpdateUsuarioDTO, UsuariosFilter } from "../types/users.types";
import { mockUsuarios } from "../mocks/users.mock";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const usersService = {
  async listar(filter: UsuariosFilter = {}): Promise<Usuario[]> {
    if (USE_MOCKS) {
      await delay();
      let r = [...mockUsuarios];
      if (filter.busqueda) {
        const b = filter.busqueda.toLowerCase();
        r = r.filter((u) =>
          `${u.persona.nombres} ${u.persona.apellidos}`.toLowerCase().includes(b) ||
          u.email.toLowerCase().includes(b) ||
          u.persona.ci.includes(b)
        );
      }
      if (filter.rol && filter.rol !== "Todos") r = r.filter((u) => u.rol === filter.rol);
      if (filter.estado) r = r.filter((u) => u.estado === filter.estado);
      return r;
    }
    const { data } = await api.get<Usuario[]>("/usuarios", { params: filter });
    return data;
  },

  async obtenerPorId(id: number): Promise<Usuario> {
    if (USE_MOCKS) {
      await delay();
      const u = mockUsuarios.find((u) => u.id === id);
      if (!u) throw new Error(`Usuario ${id} no encontrado`);
      return u;
    }
    const { data } = await api.get<Usuario>(`/usuarios/${id}`);
    return data;
  },

  async crear(dto: CreateUsuarioDTO): Promise<Usuario> {
    if (USE_MOCKS) {
      await delay();
      const newUser: Usuario = {
        id: Math.max(...mockUsuarios.map((u) => u.id), 0) + 1,
        email: dto.email, rol: dto.rol, estado: "Activo",
        fechaCreacion: new Date().toISOString().split("T")[0],
        persona: { ci: dto.ci, nombres: dto.nombres, apellidos: dto.apellidos, telefono: dto.telefono, direccion: dto.direccion },
      };
      mockUsuarios.push(newUser);
      return newUser;
    }
    const { data } = await api.post<Usuario>("/usuarios", dto);
    return data;
  },

  async actualizar(dto: UpdateUsuarioDTO): Promise<Usuario> {
    if (USE_MOCKS) {
      await delay();
      const idx = mockUsuarios.findIndex((u) => u.id === dto.id);
      if (idx === -1) throw new Error(`Usuario ${dto.id} no encontrado`);
      mockUsuarios[idx] = {
        ...mockUsuarios[idx],
        ...(dto.rol ? { rol: dto.rol } : {}),
        persona: { ...mockUsuarios[idx].persona, nombres: dto.nombres ?? mockUsuarios[idx].persona.nombres, apellidos: dto.apellidos ?? mockUsuarios[idx].persona.apellidos, telefono: dto.telefono ?? mockUsuarios[idx].persona.telefono, direccion: dto.direccion ?? mockUsuarios[idx].persona.direccion },
      };
      return mockUsuarios[idx];
    }
    const { data } = await api.put<Usuario>(`/usuarios/${dto.id}`, dto);
    return data;
  },

  async toggleEstado(id: number): Promise<Usuario> {
    if (USE_MOCKS) {
      await delay();
      const u = mockUsuarios.find((u) => u.id === id);
      if (!u) throw new Error(`Usuario ${id} no encontrado`);
      u.estado = u.estado === "Activo" ? "Deshabilitado" : "Activo";
      return u;
    }
    const { data } = await api.patch<Usuario>(`/usuarios/${id}/estado`, {});
    return data;
  },
};
