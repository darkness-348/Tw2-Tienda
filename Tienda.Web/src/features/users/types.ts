export interface Usuario {
  Id: number;
  Email: string;
  FechaCreacion: string;
  Rol: string;
  Estado: string;
}

export interface Persona {
  Id: number;
  Ci: string;
  Nombres: string;
  Apellidos: string;
  Telefono: string;
  Direccion: string;
}

export interface UsuarioConPersona extends Usuario, Persona {}

export type RolUsuario = 'Gerente' | 'Cajero' | 'Encargado de Almacén' | 'Todos';
