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
    // GET /api/Usuarios/Usuarios-con-roles  (returns [{nombre, email, rol, estado}])
    const { data } = await api.get<Usuario[]>("/Usuarios/Usuarios-con-roles");
    return data;
  },

  async obtenerPorId(id: number): Promise<Usuario> {
    if (USE_MOCKS) {
      await delay();
      const u = mockUsuarios.find((u) => u.id === id);
      if (!u) throw new Error(`Usuario ${id} no encontrado`);
      return u;
    }
    // No hay endpoint por id — listar y filtrar
    const { data } = await api.get<Usuario[]>("/Usuarios/Usuarios-con-roles");
    const u = data.find((u: Usuario) => u.id === id);
    if (!u) throw new Error(`Usuario ${id} no encontrado`);
    return u;
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
    // No hay endpoint de creación directa — usar registro en AuthController
    const { data } = await api.post<Usuario>("/Auth/register", dto);
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
    // PATCH /api/Usuarios/Actualizar-Rol-Email  { Email, RolActual, RolNuevo }
    const target = mockUsuarios.find((u) => u.id === dto.id);
    const { data } = await api.patch<Usuario>("/Usuarios/Actualizar-Rol-Email", {
      Email: target?.email ?? dto.id,
      RolActual: target?.rol,
      RolNuevo: dto.rol,
    });
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
    // DELETE /api/Usuarios/Eliminar-Usuario  { Nombre, Email }
    // (backend uses delete, not toggle — send delete request)
    const target = mockUsuarios.find((u) => u.id === id);
    const { data } = await api.delete<Usuario>("/Usuarios/Eliminar-Usuario", {
      data: { Nombre: `${target?.persona?.nombres} ${target?.persona?.apellidos}`, Email: target?.email },
    });
    return data;
  },
};
