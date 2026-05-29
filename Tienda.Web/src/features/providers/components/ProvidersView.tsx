import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

interface ProvidersViewProps {
  triggerToast: (msg: string) => void;
}

export default function ProvidersView({ triggerToast }: ProvidersViewProps) {
  const [providerSearch, setProviderSearch] = useState('');

  const providersList = [
    { name: 'Distribuidora La Paz S.R.L.', contact: 'Juan Pérez', phone: '700-12345', products: 'Arroz, Azúcar, Fideos', status: 'Activo' },
    { name: 'Lácteos PIL Andina', contact: 'María Gutiérrez', phone: '712-98765', products: 'Leche, Yogur, Mantequilla', status: 'Activo' },
    { name: 'Comercial Santa Cruz', contact: 'Carlos Rojas', phone: '765-44521', products: 'Bebidas, Snacks', status: 'Activo' },
    { name: 'Limpieza Total Ltda.', contact: 'Ana Mendoza', phone: '733-11200', products: 'Detergentes, Jabones', status: 'Inactivo' },
    { name: 'Panificadora El Trigal', contact: 'Pedro Quispe', phone: '708-65432', products: 'Pan, Galletas, Repostería', status: 'Activo' },
    { name: 'Avícola Cochabamba', contact: 'Lucía Vargas', phone: '744-30021', products: 'Huevos, Pollo', status: 'Activo' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center gap-4 select-none">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar proveedor..."
            value={providerSearch}
            onChange={(e) => setProviderSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/10"
          />
        </div>

        <button
          onClick={() => triggerToast('Proveedor registrado con éxito.')}
          className="flex items-center gap-1.5 py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Proveedor</span>
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-850/50 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5">Nombre</th>
                <th className="py-3.5 px-5">Contacto</th>
                <th className="py-3.5 px-5">Teléfono</th>
                <th className="py-3.5 px-5">Productos que suministra</th>
                <th className="py-3.5 px-5">Estado</th>
                <th className="py-3.5 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {providersList
                .filter(p => p.name.toLowerCase().includes(providerSearch.toLowerCase()) || p.contact.toLowerCase().includes(providerSearch.toLowerCase()))
                .map(prov => (
                  <tr key={prov.name} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-neutral-900 dark:text-white">{prov.name}</td>
                    <td className="py-3.5 px-5 text-neutral-600 dark:text-neutral-300 font-medium">{prov.contact}</td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono">{prov.phone}</td>
                    <td className="py-3.5 px-5 text-neutral-500">{prov.products}</td>
                    <td className="py-3.5 px-5">
                      {prov.status === 'Activo' ? (
                        <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 text-neutral-500 dark:border-neutral-700 text-[10px] font-bold uppercase tracking-wider">
                          {prov.status}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-450 dark:text-neutral-550 text-[10px] font-bold uppercase tracking-wider">
                          {prov.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => triggerToast(`Cargando historial de pedidos para ${prov.name}...`)}
                        className="py-1 px-3 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Ver Historial de Pedidos
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
