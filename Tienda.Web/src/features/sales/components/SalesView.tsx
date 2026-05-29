import { useState } from 'react';
import { Search, FileText, Trash2, Plus, TrendingUp } from 'lucide-react';

interface SalesViewProps {
  triggerToast: (msg: string) => void;
}

export default function SalesView({ triggerToast }: SalesViewProps) {
  const [ticketItems, setTicketItems] = useState<Array<{ id: number; name: string; qty: number; price: number }>>([
    { id: 1, name: 'Arroz Grano de Oro 1kg', qty: 2, price: 8.50 },
    { id: 2, name: 'Aceite Fino 900ml', qty: 1, price: 14.00 },
    { id: 5, name: 'Leche PIL Entera 1L', qty: 3, price: 7.00 },
    { id: 6, name: 'Coca-Cola 2L', qty: 1, price: 12.00 }
  ]);
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'tarjeta' | 'qr'>('efectivo');
  const [montoRecibido, setMontoRecibido] = useState<string>('100,00');

  const productsCatalog = [
    { id: 1, name: 'Arroz Grano de Oro 1kg', price: 8.50, stock: 42 },
    { id: 2, name: 'Aceite Fino 900ml', price: 14.00, stock: 18 },
    { id: 3, name: 'Azúcar Guabirá 1kg', price: 6.00, stock: 30 },
    { id: 4, name: 'Fideo Lazo 400g', price: 5.50, stock: 64 },
    { id: 5, name: 'Leche PIL Entera 1L', price: 7.00, stock: 12 },
    { id: 6, name: 'Coca-Cola 2L', price: 12.00, stock: 27 }
  ];

  const addProductToTicket = (prod: typeof productsCatalog[0]) => {
    const existing = ticketItems.find(item => item.id === prod.id);
    if (existing) {
      setTicketItems(ticketItems.map(item => item.id === prod.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setTicketItems([...ticketItems, { id: prod.id, name: prod.name, qty: 1, price: prod.price }]);
    }
  };

  const removeItemFromTicket = (id: number) => {
    setTicketItems(ticketItems.filter(item => item.id !== id));
  };

  const updateItemQty = (id: number, delta: number) => {
    setTicketItems(ticketItems.map(item => {
      if (item.id === id) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : item;
      }
      return item;
    }));
  };

  const subtotalTicket = ticketItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountTicket = 0.00;
  const totalTicket = subtotalTicket - discountTicket;

  const parsedMonto = parseFloat(montoRecibido.replace(',', '.')) || 0;
  const changeTicket = Math.max(0, parsedMonto - totalTicket);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar producto por nombre o código de barras..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-900 text-[14px] rounded-lg border border-neutral-300 dark:border-neutral-800 focus:border-neutral-500 focus:ring-4 focus:ring-neutral-500/10 outline-none transition-all"
          />
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4 select-none">
            <h3 className="text-[14px] font-bold text-neutral-900 dark:text-white">Productos</h3>
            <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">Toque para agregar al ticket</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {productsCatalog.map(prod => (
              <button
                key={prod.id}
                onClick={() => addProductToTicket(prod)}
                className="flex flex-col border border-neutral-200/60 dark:border-neutral-800/60 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg overflow-hidden bg-neutral-50/20 dark:bg-neutral-900 text-left p-3 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-full h-24 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center overflow-hidden mb-3 border border-neutral-200/50 dark:border-neutral-850/50 relative">
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <pattern id={`pos-stripe-${prod.id}`} width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(0,0,0,0.03)" strokeWidth="6" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pos-stripe-${prod.id})`} />
                  </svg>
                  <span className="font-display text-[9px] font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-widest relative z-10">IMG</span>
                </div>
                
                <p className="text-[13px] font-bold text-neutral-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors truncate w-full">{prod.name}</p>
                <p className="text-[14px] font-extrabold text-neutral-800 dark:text-neutral-300 mt-1">Bs {prod.price.toFixed(2).replace('.', ',')}</p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold mt-1">Stock: {prod.stock}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 shadow-sm flex flex-col gap-5">
        <div className="flex justify-between items-center select-none border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
            <FileText className="w-4 h-4 text-neutral-500" />
            <span className="text-[14px] font-bold">Ticket de Venta</span>
          </div>
          <span className="text-[11px] font-bold text-neutral-400 tracking-wider">N° 000482</span>
        </div>

        <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1">
          {ticketItems.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 dark:text-neutral-500">
              El ticket está vacío.
            </div>
          ) : (
            ticketItems.map(item => (
              <div key={item.id} className="flex justify-between items-start gap-2 border-b border-neutral-50 dark:border-neutral-950 pb-2">
                <div className="overflow-hidden flex-1">
                  <p className="text-[12px] font-bold text-neutral-900 dark:text-white truncate">{item.name}</p>
                  <div className="flex items-center gap-1.5 mt-1 select-none">
                    <button
                      onClick={() => updateItemQty(item.id, -1)}
                      className="w-5 h-5 flex items-center justify-center border border-neutral-250 dark:border-neutral-700 text-neutral-550 rounded font-bold hover:bg-neutral-50 dark:hover:bg-neutral-850 text-[12px] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-[11px] font-bold w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateItemQty(item.id, 1)}
                      className="w-5 h-5 flex items-center justify-center border border-neutral-250 dark:border-neutral-700 text-neutral-550 rounded font-bold hover:bg-neutral-50 dark:hover:bg-neutral-855 text-[12px] cursor-pointer"
                    >
                      +
                    </button>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 pl-1">x Bs {item.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[12px] font-extrabold text-neutral-800 dark:text-neutral-200">
                    {(item.price * item.qty).toFixed(2).replace('.', ',')}
                  </span>
                  <button
                    onClick={() => removeItemFromTicket(item.id)}
                    className="text-red-500 hover:text-red-750 p-0.5 mt-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 flex flex-col gap-2 text-[13px] font-medium text-neutral-500 dark:text-neutral-400 select-none">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-neutral-800 dark:text-neutral-200">Bs {subtotalTicket.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between">
            <span>Descuento</span>
            <span className="text-neutral-800 dark:text-neutral-200">Bs {discountTicket.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-[16px] font-extrabold text-neutral-900 dark:text-white border-t border-neutral-100 dark:border-neutral-800 pt-3">
            <span>TOTAL</span>
            <span>Bs {totalTicket.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 select-none">
          <p className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Método de pago</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('efectivo')}
              className={`py-2 px-1 border rounded-lg text-[12px] font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                paymentMethod === 'efectivo'
                  ? 'border-neutral-500 bg-neutral-100 dark:bg-neutral-850 dark:text-white'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Efectivo</span>
            </button>
            <button
              onClick={() => setPaymentMethod('tarjeta')}
              className={`py-2 px-1 border rounded-lg text-[12px] font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                paymentMethod === 'tarjeta'
                  ? 'border-neutral-500 bg-neutral-100 dark:bg-neutral-850 dark:text-white'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Tarjeta</span>
            </button>
            <button
              onClick={() => setPaymentMethod('qr')}
              className={`py-2 px-1 border rounded-lg text-[12px] font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                paymentMethod === 'qr'
                  ? 'border-neutral-500 bg-neutral-100 dark:bg-neutral-850 dark:text-white'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>QR</span>
            </button>
          </div>

          <label className="flex items-center gap-2 mt-2 text-[12px] text-neutral-500 dark:text-neutral-400 cursor-pointer">
            <input type="checkbox" className="rounded border-neutral-300 dark:border-neutral-800" />
            <span>Pago mixto (combinar métodos)</span>
          </label>
        </div>

        {paymentMethod === 'efectivo' && (
          <div className="grid grid-cols-2 gap-4 select-none">
            <div>
              <label className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-1">Monto recibido</label>
              <input
                type="text"
                value={montoRecibido}
                onChange={(e) => setMontoRecibido(e.target.value)}
                className="w-full py-1.5 px-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-500"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-1">Vuelto (auto)</span>
              <div className="w-full py-1.5 px-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg text-[13px] font-bold text-neutral-700 dark:text-neutral-300">
                Bs {changeTicket.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setTicketItems([]);
            triggerToast('Venta registrada y comprobante emitido exitosamente.');
          }}
          disabled={ticketItems.length === 0}
          className="w-full py-3 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[14px] font-semibold transition-colors cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none"
        >
          Cobrar y Emitir Comprobante
        </button>
      </div>
    </div>
  );
}
