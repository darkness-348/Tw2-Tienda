import { useState } from 'react';
import { AlertCircle, Search, Plus, FileText } from 'lucide-react';

interface InventoryViewProps {
  triggerToast: (msg: string) => void;
}

export default function InventoryView({ triggerToast }: InventoryViewProps) {
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategory, setInventoryCategory] = useState('Todas');
  const [inventoryStatus, setInventoryStatus] = useState('Todos');

  const inventoryItems = [
    { code: '7501234500011', name: 'Arroz Grano de Oro 1kg', category: 'Abarrotes', stock: 42, min: 15, status: 'Normal', expiry: '12/2026' },
    { code: '7501234500028', name: 'Leche PIL Entera 1L', category: 'Lácteos', stock: 8, min: 20, status: 'Stock bajo', expiry: '06/2026' },
    { code: '7501234500035', name: 'Aceite Fino 900ml', category: 'Abarrotes', stock: 18, min: 10, status: 'Normal', expiry: '03/2027' },
    { code: '7501234500042', name: 'Yogur Bati 1L', category: 'Lácteos', stock: 5, min: 8, status: 'Vencido', expiry: '04/2026' },
    { code: '7501234500059', name: 'Pan Molde Grande', category: 'Panadería', stock: 3, min: 12, status: 'Stock bajo', expiry: '28/05/2026' },
    { code: '7501234500066', name: 'Coca-Cola 2L', category: 'Bebidas', stock: 27, min: 15, status: 'Normal', expiry: '11/2026' },
    { code: '7501234500073', name: 'Mantequilla La Campiña', category: 'Lácteos', stock: 2, min: 10, status: 'Stock bajo', expiry: '09/2026' },
    { code: '7501234500080', name: 'Detergente Ola 1kg', category: 'Limpieza', stock: 21, min: 10, status: 'Normal', expiry: '—' },
    { code: '7501234500097', name: 'Galletas María (caja dañada)', category: 'Abarrotes', stock: 6, min: 12, status: 'Dañado', expiry: '02/2027' },
    { code: '7501234500103', name: 'Huevos x30', category: 'Abarrotes', stock: 15, min: 8, status: 'Normal', expiry: '10/06/2026' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950/20 rounded-lg flex items-start gap-3 select-none">
        <AlertCircle className="w-5 h-5 text-neutral-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="font-bold">Alerta de stock crítico:</strong> 3 productos por debajo del stock mínimo — Leche PIL Entera 1L, Pan Molde Grande, Mantequilla La Campiña
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 select-none">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative col-span-1 sm:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, código..."
              value={inventorySearch}
              onChange={(e) => setInventorySearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/10"
            />
          </div>

          <select
            value={inventoryCategory}
            onChange={(e) => setInventoryCategory(e.target.value)}
            className="py-2 px-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none"
          >
            <option value="Todas">Categoría: Todas</option>
            <option value="Abarrotes">Abarrotes</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Panadería">Panadería</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Limpieza">Limpieza</option>
          </select>

          <select
            value={inventoryStatus}
            onChange={(e) => setInventoryStatus(e.target.value)}
            className="py-2 px-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none"
          >
            <option value="Todos">Estado: Todos</option>
            <option value="Normal">Normal</option>
            <option value="Stock bajo">Stock bajo</option>
            <option value="Vencido">Vencido</option>
            <option value="Dañado">Dañado</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => triggerToast('Ingreso de producto registrado con éxito.')}
            className="flex items-center gap-1.5 py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Ingreso de Producto</span>
          </button>
          
          <button 
            onClick={() => triggerToast('Exportando reporte del inventario completo...')}
            className="flex items-center gap-1.5 py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg text-[13px] font-semibold transition-all cursor-pointer text-neutral-600 dark:text-neutral-400"
          >
            <FileText className="w-4 h-4" />
            <span>Generar Reporte de Inventario</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-850/50 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5">Código de barras</th>
                <th className="py-3.5 px-5">Nombre</th>
                <th className="py-3.5 px-5">Categoría</th>
                <th className="py-3.5 px-5">Stock Actual</th>
                <th className="py-3.5 px-5">Stock Mínimo</th>
                <th className="py-3.5 px-5">Estado</th>
                <th className="py-3.5 px-5">Fecha de Vencimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {inventoryItems
                .filter(item => {
                  const matchesSearch = item.name.toLowerCase().includes(inventorySearch.toLowerCase()) || item.code.includes(inventorySearch);
                  const matchesCategory = inventoryCategory === 'Todas' || item.category === inventoryCategory;
                  const matchesStatus = inventoryStatus === 'Todos' || item.status === inventoryStatus;
                  return matchesSearch && matchesCategory && matchesStatus;
                })
                .map(item => (
                  <tr key={item.code} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-neutral-500">{item.code}</td>
                    <td className="py-3.5 px-5 font-bold text-neutral-900 dark:text-white">{item.name}</td>
                    <td className="py-3.5 px-5 text-neutral-500">{item.category}</td>
                    <td className={`py-3.5 px-5 font-extrabold ${item.stock <= item.min ? 'text-red-500' : 'text-neutral-800 dark:text-neutral-200'}`}>{item.stock}</td>
                    <td className="py-3.5 px-5 text-neutral-400">{item.min}</td>
                    <td className="py-3.5 px-5">
                      {item.status === 'Normal' && (
                        <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 text-neutral-500 dark:border-neutral-700 text-[10px] font-bold uppercase tracking-wider">
                          {item.status}
                        </span>
                      )}
                      {item.status === 'Stock bajo' && (
                        <span className="px-2.5 py-0.5 rounded-full border border-dashed border-amber-400 text-amber-500 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                          {item.status}
                        </span>
                      )}
                      {item.status === 'Vencido' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider">
                          {item.status}
                        </span>
                      )}
                      {item.status === 'Dañado' && (
                        <span className="px-2.5 py-0.5 rounded-full border border-neutral-350 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono">{item.expiry}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
