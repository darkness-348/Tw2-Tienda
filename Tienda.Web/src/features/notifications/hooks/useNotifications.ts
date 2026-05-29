import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";

export function useNotificaciones() {
  return useQuery({ queryKey: ["notificaciones"], queryFn: () => notificationsService.listar(), refetchInterval: 60_000 });
}

export function useContarNoLeidas() {
  return useQuery({ queryKey: ["notificaciones", "count"], queryFn: () => notificationsService.contarNoLeidas(), refetchInterval: 30_000 });
}

export function useMarcarLeida() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: number) => notificationsService.marcarLeida(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["notificaciones"] }) });
}

export function useMarcarTodasLeidas() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: () => notificationsService.marcarTodasLeidas(), onSuccess: () => qc.invalidateQueries({ queryKey: ["notificaciones"] }) });
}
