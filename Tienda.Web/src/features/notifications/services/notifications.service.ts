import { api } from "../../../api/client";
import { USE_MOCKS } from "../../../api/config";
import type { Notificacion } from "../types/notifications.types";
import { mockNotificaciones } from "../mocks/notifications.mock";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const notificationsService = {
  async listar(): Promise<Notificacion[]> {
    if (USE_MOCKS) { await delay(); return [...mockNotificaciones]; }
    const { data } = await api.get<Notificacion[]>("/notificaciones");
    return data;
  },

  async marcarLeida(id: number): Promise<Notificacion> {
    if (USE_MOCKS) {
      await delay();
      const n = mockNotificaciones.find((n) => n.id === id);
      if (!n) throw new Error(`Notificación ${id} no encontrada`);
      n.leida = true;
      return n;
    }
    const { data } = await api.patch<Notificacion>(`/notificaciones/${id}/leer`, {});
    return data;
  },

  async marcarTodasLeidas(): Promise<void> {
    if (USE_MOCKS) { await delay(); mockNotificaciones.forEach((n) => (n.leida = true)); return; }
    await api.patch("/notificaciones/leer-todas", {});
  },

  async contarNoLeidas(): Promise<number> {
    if (USE_MOCKS) { await delay(); return mockNotificaciones.filter((n) => !n.leida).length; }
    const { data } = await api.get<{ count: number }>("/notificaciones/no-leidas/count");
    return data.count;
  },
};
