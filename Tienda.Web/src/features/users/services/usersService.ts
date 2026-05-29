import type { UsuarioConPersona } from '../types';

const MOCK_USERS: UsuarioConPersona[] = [
  { Id: 1, Ci: '7123456', Nombres: 'Roberto', Apellidos: 'Salinas', Telefono: '71234567', Direccion: 'Av. Montes 123', Email: 'roberto.s@elahorro.bo', FechaCreacion: '2023-01-15', Rol: 'Gerente', Estado: 'Activo' },
  { Id: 2, Ci: '6234567', Nombres: 'Elena', Apellidos: 'Choque', Telefono: '62345678', Direccion: 'Calle Potosí 45', Email: 'elena.c@elahorro.bo', FechaCreacion: '2023-03-10', Rol: 'Cajero', Estado: 'Activo' },
  { Id: 3, Ci: '8345678', Nombres: 'Marco Antonio', Apellidos: 'Vega', Telefono: '73456789', Direccion: 'Villa Fátima Bloque 3', Email: 'marco.v@elahorro.bo', FechaCreacion: '2023-03-12', Rol: 'Encargado de Almacén', Estado: 'Activo' },
  { Id: 4, Ci: '5456789', Nombres: 'Sofía', Apellidos: 'Mamani', Telefono: '64567890', Direccion: 'Calle Murillo 78', Email: 'sofia.m@elahorro.bo', FechaCreacion: '2023-06-01', Rol: 'Cajero', Estado: 'Deshabilitado' },
  { Id: 5, Ci: '9567890', Nombres: 'Diego', Apellidos: 'Fernández', Telefono: '75678901', Direccion: 'Los Pinos 22', Email: 'diego.f@elahorro.bo', FechaCreacion: '2024-01-20', Rol: 'Cajero', Estado: 'Activo' },
];

let store = [...MOCK_USERS];

export const usersService = {
  getAll: (): Promise<UsuarioConPersona[]> =>
    Promise.resolve([...store]),

  toggleEstado: (id: number): Promise<UsuarioConPersona[]> => {
    store = store.map(u =>
      u.Id === id ? { ...u, Estado: u.Estado === 'Activo' ? 'Deshabilitado' : 'Activo' } : u
    );
    return Promise.resolve([...store]);
  },

  update: (id: number, data: Partial<UsuarioConPersona>): Promise<UsuarioConPersona[]> => {
    store = store.map(u => (u.Id === id ? { ...u, ...data } : u));
    return Promise.resolve([...store]);
  },
};
