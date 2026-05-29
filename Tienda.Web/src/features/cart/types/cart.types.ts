export interface CartItem {
  productoId: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  cantidadArticulos: number;
}
