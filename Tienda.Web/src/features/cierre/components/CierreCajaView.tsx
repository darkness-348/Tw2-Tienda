import { useState } from 'react';

interface CierreCajaViewProps {
  triggerToast: (msg: string) => void;
}

export default function CierreCajaView({ triggerToast }: CierreCajaViewProps) {
  const [observaciones, setObservaciones] = useState('');

  return (
    <div className="flex items-start justify-center py-6 select-none">
      <div className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4 text-neutral-900 dark:text-white">
          <span className="text-[14px] font-bold">Resumen del día</span>
          <span className="text-[12px] font-semibold text-neutral-400">26/05/2026</span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-[16px] font-bold text-neutral-900 dark:text-white">Total de ventas del día</h3>
          <span className="text-[24px] font-extrabold text-neutral-950 dark:text-white">Bs 4.820,00</span>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest border-b border-neutral-100 dark:border-neutral-800 pb-1.5">Desglose por método de pago</p>
          
          <div className="flex justify-between items-center text-[13px] font-medium py-1">
            <span className="text-neutral-500">Efectivo</span>
            <span className="text-neutral-800 dark:text-neutral-200">Bs 2.640,00</span>
          </div>

          <div className="flex justify-between items-center text-[13px] font-medium py-1">
            <span className="text-neutral-500">Tarjeta</span>
            <span className="text-neutral-800 dark:text-neutral-200">Bs 1.380,00</span>
          </div>

          <div className="flex justify-between items-center text-[13px] font-medium py-1">
            <span className="text-neutral-500">QR</span>
            <span className="text-neutral-800 dark:text-neutral-200">Bs 800,00</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-neutral-200/60 dark:border-neutral-800/60 p-4 rounded-lg">
            <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">N° de Transacciones</p>
            <span className="text-[26px] font-black text-neutral-900 dark:text-white leading-none">87</span>
          </div>
          
          <div className="border border-neutral-200/60 dark:border-neutral-800/60 p-4 rounded-lg">
            <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Ticket Promedio</p>
            <span className="text-[20px] font-black text-neutral-900 dark:text-white leading-none">Bs 55,40</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] text-neutral-500 font-bold uppercase tracking-wider">Observaciones (opcional)</label>
          <textarea
            rows={3}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Notas del cierre, diferencias en caja, etc."
            className="w-full p-3 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 rounded-lg text-[13px] outline-none focus:border-neutral-500 resize-none"
          />
        </div>

        <button
          onClick={() => {
            setObservaciones('');
            triggerToast('Cierre de caja cargado y cerrado correctamente.');
          }}
          className="w-full py-3 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[14px] font-bold transition-all cursor-pointer"
        >
          Generar y Cargar Cierre de Caja
        </button>
      </div>
    </div>
  );
}
