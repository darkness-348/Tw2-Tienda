import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../services/cart.service";
import type { CartItem } from "../types/cart.types";

export function useCart() {
  return useQuery({ queryKey: ["cart"], queryFn: () => cartService.obtener(), staleTime: 0 });
}

export function useAgregarAlCarrito() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (item: CartItem) => cartService.agregar(item),
    onSuccess: (data) => qc.setQueryData(["cart"], data),
  });
}

export function useEliminarDelCarrito() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (productoId: number) => cartService.eliminar(productoId),
    onSuccess: (data) => qc.setQueryData(["cart"], data),
  });
}

export function useActualizarCarrito() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { productoId: number; cantidad: number }) =>
      cartService.actualizar(args.productoId, args.cantidad),
    onSuccess: (data) => qc.setQueryData(["cart"], data),
  });
}

export function useVaciarCarrito() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => cartService.vaciar(),
    onSuccess: (data) => qc.setQueryData(["cart"], data),
  });
}
