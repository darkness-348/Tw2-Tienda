import { USE_MOCKS } from "../../../api/config";
import type { Cart, CartItem } from "../types/cart.types";

const CART_KEY = "tienda_cart";

class CartManager {
  private get(): Cart {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) return JSON.parse(stored) as Cart;
    } catch {}
    return { items: [], total: 0, cantidadArticulos: 0 };
  }

  private save(cart: Cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private recalcular(cart: Cart): Cart {
    cart.total = cart.items.reduce((s, i) => s + i.subtotal, 0);
    cart.cantidadArticulos = cart.items.reduce((s, i) => s + i.cantidad, 0);
    return cart;
  }

  obtener(): Cart { return this.get(); }

  agregar(item: CartItem): Cart {
    const cart = this.get();
    const existe = cart.items.find((i) => i.productoId === item.productoId);
    if (existe) {
      existe.cantidad += item.cantidad;
      existe.subtotal = existe.cantidad * existe.precioUnitario;
    } else {
      cart.items.push({ ...item });
    }
    const updated = this.recalcular(cart);
    this.save(updated);
    return updated;
  }

  eliminar(productoId: number): Cart {
    const cart = this.get();
    cart.items = cart.items.filter((i) => i.productoId !== productoId);
    const updated = this.recalcular(cart);
    this.save(updated);
    return updated;
  }

  actualizar(productoId: number, cantidad: number): Cart {
    const cart = this.get();
    if (cantidad <= 0) return this.eliminar(productoId);
    const item = cart.items.find((i) => i.productoId === productoId);
    if (item) { item.cantidad = cantidad; item.subtotal = cantidad * item.precioUnitario; }
    const updated = this.recalcular(cart);
    this.save(updated);
    return updated;
  }

  vaciar(): Cart {
    const empty: Cart = { items: [], total: 0, cantidadArticulos: 0 };
    localStorage.removeItem(CART_KEY);
    return empty;
  }
}

const manager = new CartManager();
const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

export const cartService = {
  async obtener(): Promise<Cart> { await delay(); return manager.obtener(); },
  async agregar(item: CartItem): Promise<Cart> {
    if (USE_MOCKS) { await delay(); return manager.agregar(item); }
    return manager.agregar(item);
  },
  async eliminar(productoId: number): Promise<Cart> {
    if (USE_MOCKS) { await delay(); return manager.eliminar(productoId); }
    return manager.eliminar(productoId);
  },
  async actualizar(productoId: number, cantidad: number): Promise<Cart> {
    if (USE_MOCKS) { await delay(); return manager.actualizar(productoId, cantidad); }
    return manager.actualizar(productoId, cantidad);
  },
  async vaciar(): Promise<Cart> {
    if (USE_MOCKS) { await delay(); return manager.vaciar(); }
    return manager.vaciar();
  },
};
