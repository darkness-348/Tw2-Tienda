export type TipoNotificacion = "stock_bajo" | "producto_vencido" | "venta" | "sistema";

export interface Notificacion {
  id: number;
  tipo: TipoNotificacion;
  titulo: string;
  mensaje: string;
  leida: boolean;
  fechaCreacion: string;
  datos?: Record<string, unknown>;
}
