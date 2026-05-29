import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "../services/products.service";
import type {
  CreateProductDTO,
  UpdateProductDTO,
  ProductFilter,
} from "../types/products.types";

export function useProducts(filter?: ProductFilter) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => productsService.listar(filter),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productsService.obtenerPorId(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateProductDTO) => productsService.crear(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateProductDTO) => productsService.actualizar(dto),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.setQueryData(["products", data.id], data);
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productsService.eliminar(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useToggleProductStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, activo }: { id: number; activo: boolean }) =>
      productsService.toggleActivo(id, activo),
    onSuccess: (data) => {
      qc.setQueryData(["products", data.id], data);
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useTopProducts() {
  return useQuery({
    queryKey: ["products", "top-vendidos"],
    queryFn: () => productsService.obtenerMasVendidos(),
  });
}

export function useVencidosProducts() {
  return useQuery({
    queryKey: ["products", "vencidos"],
    queryFn: () => productsService.obtenerVencidos(),
  });
}

export function useStockBajoProducts(stockMinimo?: number) {
  return useQuery({
    queryKey: ["products", "stock-bajo", stockMinimo],
    queryFn: () => productsService.obtenerStockBajo(stockMinimo),
  });
}
