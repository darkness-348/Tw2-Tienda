import type { MetodoPago, MetodoPagoFormData } from '../types';

const MOCK_PAYMENTS: MetodoPago[] = [
  { Id: 1, Nombre: 'Efectivo', Descripcion: 'Pago en efectivo bolivianos', Estado: 'Activo' },
  { Id: 2, Nombre: 'Tarjeta de Débito', Descripcion: 'Tarjetas de débito nacionales e internacionales', Estado: 'Activo' },
  { Id: 3, Nombre: 'QR', Descripcion: 'Pago por código QR — billeteras digitales', Estado: 'Activo' },
  { Id: 4, Nombre: 'Transferencia Bancaria', Descripcion: 'Transferencia directa entre cuentas bancarias', Estado: 'Inactivo' },
];

let store = [...MOCK_PAYMENTS];
let nextId = 5;

export const paymentsService = {
  getAll: (): Promise<MetodoPago[]> =>
    Promise.resolve([...store]),

  create: (data: MetodoPagoFormData): Promise<MetodoPago[]> => {
    store = [...store, { Id: nextId++, ...data }];
    return Promise.resolve([...store]);
  },

  update: (id: number, data: MetodoPagoFormData): Promise<MetodoPago[]> => {
    store = store.map(p => (p.Id === id ? { ...p, ...data } : p));
    return Promise.resolve([...store]);
  },

  toggleEstado: (id: number): Promise<MetodoPago[]> => {
    store = store.map(p =>
      p.Id === id ? { ...p, Estado: p.Estado === 'Activo' ? 'Inactivo' : 'Activo' } : p
    );
    return Promise.resolve([...store]);
  },

  delete: (id: number): Promise<MetodoPago[]> => {
    store = store.filter(p => p.Id !== id);
    return Promise.resolve([...store]);
  },
};
