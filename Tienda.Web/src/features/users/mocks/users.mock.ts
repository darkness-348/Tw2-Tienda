import type { Usuario } from "../types/users.types";

export const mockUsuarios: Usuario[] = [
  { id: 1, email: "roberto.s@elahorro.bo", rol: "Gerente", estado: "Activo", fechaCreacion: "2023-01-15", persona: { ci: "7123456", nombres: "Roberto", apellidos: "Salinas", telefono: "71234567", direccion: "Av. Montes 123" } },
  { id: 2, email: "elena.c@elahorro.bo", rol: "Cajero", estado: "Activo", fechaCreacion: "2023-03-10", persona: { ci: "6234567", nombres: "Elena", apellidos: "Choque", telefono: "62345678", direccion: "Calle Potosí 45" } },
  { id: 3, email: "marco.v@elahorro.bo", rol: "Encargado de Almacén", estado: "Activo", fechaCreacion: "2023-03-12", persona: { ci: "8345678", nombres: "Marco Antonio", apellidos: "Vega", telefono: "73456789", direccion: "Villa Fátima Bloque 3" } },
  { id: 4, email: "sofia.m@elahorro.bo", rol: "Cajero", estado: "Deshabilitado", fechaCreacion: "2023-06-01", persona: { ci: "5456789", nombres: "Sofía", apellidos: "Mamani", telefono: "64567890", direccion: "Calle Murillo 78" } },
  { id: 5, email: "diego.f@elahorro.bo", rol: "Cajero", estado: "Activo", fechaCreacion: "2024-01-20", persona: { ci: "9567890", nombres: "Diego", apellidos: "Fernández", telefono: "75678901", direccion: "Los Pinos 22" } },
];
