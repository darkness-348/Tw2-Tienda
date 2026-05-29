export interface Usuario {
  id: number;
  email: string;
  rol: "Gerente" | "Cajero" | "Encargado de Almacén";
  estado: "Activo" | "Deshabilitado";
  fechaCreacion: string;
  persona: {
    ci: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    direccion: string;
  };
}

export interface CreateUsuarioDTO {
  email: string;
  password: string;
  rol: "Gerente" | "Cajero" | "Encargado de Almacén";
  ci: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
}

export interface UpdateUsuarioDTO {
  id: number;
  rol?: "Gerente" | "Cajero" | "Encargado de Almacén";
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  direccion?: string;
}

export interface UsuariosFilter {
  busqueda?: string; // nombre, apellido, email o CI
  rol?: "Todos" | "Gerente" | "Cajero" | "Encargado de Almacén";
  estado?: "Activo" | "Deshabilitado";
}
