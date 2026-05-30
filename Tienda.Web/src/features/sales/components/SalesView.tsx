import { useState } from 'react';
import { Search, FileText, Trash2, Plus, TrendingUp, ShoppingBag } from 'lucide-react';
import { useProducts } from '../../products/hooks/useProducts';
import { useMetodosPago } from '../../payments/hooks/usePayments';
import { useCrearVenta } from '../hooks/useSales';
import type { Product } from '../../products/types/products.types';

interface SalesViewProps {
  triggerToast: (msg: string) => void;
}

type TicketItem = { productoId: number; nombre: string; qty: number; precioUnitario: number };

export default function SalesView({ triggerToast }: SalesViewProps) {
  const [search, setSearch] = useState('');
  const [ticketItems, setTicketItems] = useState<TicketItem[]>([]);
  const [paymentMethodId, setPaymentMethodId] = useState<number>(0);
  const [montoRecibido, setMontoRecibido] = useState('');

  const { data: productsResp } = useProducts();
  const { data: metodosPago = [] } = useMetodosPago();
  const crearVenta = useCrearVenta();

  const products = productsResp?.data ?? [];
  const activePagos = metodosPago.filter((m) => m.activo);

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.nombre.toLowerCase().includes(q) || p.codigoProducto.includes(q);
  });

  const addToTicket = (p: Product) => {
    setTicketItems((prev) => {
      const existing = prev.find((t) => t.productoId === p.id);
      if (existing) return prev.map((t) => t.productoId === p.id ? { ...t, qty: t.qty + 1 } : t);
      return [...prev, { productoId: p.id, nombre: p.nombre, qty: 1, precioUnitario: p.precio }];
    });
  };

  const updateQty = (productoId: number, delta: number) => {
    setTicketItems((prev) =>
      prev.map((t) => t.productoId === productoId ? { ...t, qty: Math.max(1, t.qty + delta) } : t)
    );
  };

  const removeFromTicket = (productoId: number) => {
    setTicketItems((prev) => prev.filter((t) => t.productoId !== productoId));
  };

  const subtotal = ticketItems.reduce((s, t) => s + t.precioUnitario * t.qty, 0);
  const total = subtotal;
  const monto = parseFloat(montoRecibido.replace(',', '.')) || 0;
  const vuelto = Math.max(0, monto - total);

  const handleCobrar = async () => {
    if (ticketItems.length === 0) return;
    await crearVenta.mutateAsync({
      items: ticketItems.map((t) => ({
        productoId: t.productoId,
        nombre: t.nombre,
        cantidad: t.qty,
        precioUnitario: t.precioUnitario,
        subtotal: t.precioUnitario * t.qty,
      })),
      metodoPagoId: paymentMethodId || activePagos[0]?.id || 0,
      notas: 'boleta',
    });
    setTicketItems([]);
    setMontoRecibido('');
    triggerToast('Venta registrada y comprobante emitido exitosamente.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Left: catalog */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input type="text" placeholder="Buscar producto por nombre o código de barras..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-900 text-[14px] rounded-lg border border-neutral-300 dark:border-neutral-800 focus:border-neutral-500 focus:ring-4 focus:ring-neutral-500/10 outline-none transition-all" />
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4 select-none">
            <h3 className="text-[14px] font-bold text-neutral-900 dark:text-white">Productos</h3>
            <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">Toque para agregar al ticket</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-10 flex flex-col items-center gap-3 text-neutral-400">
              <ShoppingBag className="w-8 h-8 opacity-30" />
              <p className="text-[13px]">No hay productos disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <button key={p.id} onClick={() => addToTicket(p)} className="flex flex-col border border-neutral-200/60 dark:border-neutral-800/60 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg overflow-hidden bg-neutral-50/20 dark:bg-neutral-900 text-left p-3 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-full h-20 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center mb-3 border border-neutral-200/50 dark:border-neutral-850/50">
                    <ShoppingBag className="w-6 h-6 text-neutral-300 dark:text-neutral-700" />
                  </div>
                  <p className="text-[13px] font-bold text-neutral-900 dark:text-white truncate w-full">{p.nombre}</p>
                  <p className="text-[14px] font-extrabold text-neutral-800 dark:text-neutral-300 mt-1">Bs {p.precio.toFixed(2).replace('.', ',')}</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold mt-1">Stock: {p.stock}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: ticket */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 shadow-sm flex flex-col gap-5">
        <div className="flex justify-between items-center select-none border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
            <FileText className="w-4 h-4 text-neutral-500" />
            <span className="text-[14px] font-bold">Ticket de Venta</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1">
          {ticketItems.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 dark:text-neutral-500 text-[13px]">El ticket está vacío.</div>
          ) : (
            ticketItems.map((item) => (
              <div key={item.productoId} className="flex justify-between items-start gap-2 border-b border-neutral-50 dark:border-neutral-950 pb-2">
                <div className="overflow-hidden flex-1">
                  <p className="text-[12px] font-bold text-neutral-900 dark:text-white truncate">{item.nombre}</p>
                  <div className="flex items-center gap-1.5 mt-1 select-none">
                    <button onClick={() => updateQty(item.productoId, -1)} className="w-5 h-5 flex items-center justify-center border border-neutral-250 dark:border-neutral-700 text-neutral-550 rounded font-bold hover:bg-neutral-50 dark:hover:bg-neutral-850 text-[12px] cursor-pointer">-</button>
                    <span className="text-[11px] font-bold w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.productoId, 1)} className="w-5 h-5 flex items-center justify-center border border-neutral-250 dark:border-neutral-700 text-neutral-550 rounded font-bold hover:bg-neutral-50 dark:hover:bg-neutral-855 text-[12px] cursor-pointer">+</button>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 pl-1">x Bs {item.precioUnitario.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[12px] font-extrabold text-neutral-800 dark:text-neutral-200">{(item.precioUnitario * item.qty).toFixed(2).replace('.', ',')}</span>
                  <button onClick={() => removeFromTicket(item.productoId)} className="text-red-500 hover:text-red-700 p-0.5 mt-1 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 flex flex-col gap-2 text-[13px] font-medium text-neutral-500 dark:text-neutral-400 select-none">
          <div className="flex justify-between"><span>Subtotal</span><span className="text-neutral-800 dark:text-neutral-200">Bs {subtotal.toFixed(2).replace('.', ',')}</span></div>
          <div className="flex justify-between text-[16px] font-extrabold text-neutral-900 dark:text-white border-t border-neutral-100 dark:border-neutral-800 pt-3">
            <span>TOTAL</span><span>Bs {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        {/* Método de pago */}
        <div className="flex flex-col gap-2 select-none">
          <p className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Método de pago</p>
          <div className="grid grid-cols-3 gap-2">
            {activePagos.slice(0, 3).map((m) => (
              <button key={m.id} onClick={() => setPaymentMethodId(m.id)} className={`py-2 px-1 border rounded-lg text-[11px] font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${paymentMethodId === m.id ? 'border-neutral-500 bg-neutral-100 dark:bg-neutral-850 dark:text-white' : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-600'}`}>
                <TrendingUp className="w-4 h-4" /><span>{m.nombre}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Monto recibido / vuelto */}
        <div className="grid grid-cols-2 gap-4 select-none">
          <div>
            <label className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-1">Monto recibido</label>
            <input type="text" value={montoRecibido} onChange={(e) => setMontoRecibido(e.target.value)} placeholder="0,00" className="w-full py-1.5 px-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-500" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-1">Vuelto</span>
            <div className="w-full py-1.5 px-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg text-[13px] font-bold text-neutral-700 dark:text-neutral-300">Bs {vuelto.toFixed(2).replace('.', ',')}</div>
          </div>
        </div>

        <button onClick={handleCobrar} disabled={ticketItems.length === 0 || crearVenta.isPending} className="w-full py-3 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[14px] font-semibold transition-colors cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none">
          {crearVenta.isPending ? 'Procesando...' : 'Cobrar y Emitir Comprobante'}
        </button>
      </div>
    </div>
  );
}
