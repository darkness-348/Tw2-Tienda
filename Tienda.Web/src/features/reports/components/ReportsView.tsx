import { useState } from 'react';
import { FileText, AlertCircle, Mail, TrendingUp, ShoppingCart, Package, Receipt } from 'lucide-react';
import { useReporteVentas, useReporteCompras, useExportarReportePDF } from '../hooks/useReports';
import type { PeriodoReporte, TipoReporte } from '../types/reports.types';

interface ReportsViewProps {
  triggerToast: (msg: string) => void;
}

const fmt = (n: number) =>
  `Bs ${n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function ReportsView({ triggerToast }: ReportsViewProps) {
  const [periodo, setPeriodo] = useState<PeriodoReporte>('diario');
  const [tipoReporte, setTipoReporte] = useState<TipoReporte>('ventas');

  const { data: reporteVentas, isLoading: loadingVentas } = useReporteVentas(periodo);
  const { data: reporteCompras, isLoading: loadingCompras } = useReporteCompras(periodo);
  const exportarPDF = useExportarReportePDF();

  const loading = tipoReporte === 'ventas' ? loadingVentas : loadingCompras;

  const handleExportar = async () => {
    await exportarPDF.mutateAsync({ tipo: tipoReporte, periodo });
    triggerToast(`Reporte PDF de ${tipoReporte} (${periodo}) generado.`);
  };

  return (
    <>
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Tipo: Ventas / Compras */}
          <div className="flex bg-neutral-200/60 dark:bg-neutral-800/60 p-1 rounded-xl">
            {(['ventas', 'compras'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTipoReporte(t)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold capitalize transition-all cursor-pointer ${
                  tipoReporte === t
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {t === 'ventas' ? 'Ventas' : 'Compras'}
              </button>
            ))}
          </div>

          {/* Periodo */}
          <div className="flex bg-neutral-200/60 dark:bg-neutral-800/60 p-1 rounded-xl">
            {(['diario', 'semanal', 'mensual'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold capitalize transition-all cursor-pointer ${
                  periodo === p
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleExportar}
          disabled={exportarPDF.isPending}
          className="flex items-center gap-2 py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg text-[13px] font-semibold transition-all cursor-pointer text-neutral-700 dark:text-neutral-300 disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          <span>{exportarPDF.isPending ? 'Generando...' : 'Exportar PDF'}</span>
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-[13px] text-neutral-400">Cargando datos...</div>
      ) : (
        <>
          {/* ── VENTAS ── */}
          {tipoReporte === 'ventas' && reporteVentas && (
            <>
              {/* KPI cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-32">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-neutral-400" />
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Total Vendido</p>
                  </div>
                  <h3 className="text-[26px] font-extrabold text-neutral-900 dark:text-white leading-none">{fmt(reporteVentas.totalVentas)}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">{reporteVentas.cantidadTransacciones} transacciones</span>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-32">
                  <div className="flex items-center gap-2 mb-1">
                    <Receipt className="w-4 h-4 text-neutral-400" />
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Ticket Promedio</p>
                  </div>
                  <h3 className="text-[26px] font-extrabold text-neutral-900 dark:text-white leading-none">{fmt(reporteVentas.promedioVenta)}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">por transacción</span>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-32">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-neutral-400" />
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Producto Top</p>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-neutral-900 dark:text-white leading-snug mt-1">{reporteVentas.productoMasVendido.nombre}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">{reporteVentas.productoMasVendido.cantidadVendida} unidades</span>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-32">
                  <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Período</p>
                  <h3 className="text-[26px] font-extrabold text-neutral-900 dark:text-white leading-none capitalize">{periodo}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">{reporteVentas.ventasPorDia.length} día{reporteVentas.ventasPorDia.length !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Top productos table */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
                <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-[14px] font-bold text-neutral-900 dark:text-white">Top Productos Vendidos</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="bg-neutral-50 dark:bg-neutral-850/50 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-5">#</th>
                        <th className="py-3 px-5">Producto</th>
                        <th className="py-3 px-5">Cantidad Vendida</th>
                        <th className="py-3 px-5 text-right">Ingreso Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                      {reporteVentas.topProductos.map((p, i) => (
                        <tr key={p.productoId} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                          <td className="py-3 px-5 text-neutral-400 font-mono text-[11px]">{i + 1}</td>
                          <td className="py-3 px-5 font-medium text-neutral-800 dark:text-neutral-200">{p.nombre}</td>
                          <td className="py-3 px-5 text-neutral-500 font-mono">{p.cantidadVendida}</td>
                          <td className="py-3 px-5 text-right font-bold text-neutral-900 dark:text-white">{fmt(p.ingresoTotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850/50">
                        <td colSpan={3} className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total General</td>
                        <td className="py-3 px-5 text-right text-[15px] font-extrabold text-neutral-900 dark:text-white">
                          {fmt(reporteVentas.totalVentas)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ── COMPRAS ── */}
          {tipoReporte === 'compras' && reporteCompras && (
            <>
              {/* KPI cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-32">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingCart className="w-4 h-4 text-neutral-400" />
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Total Comprado</p>
                  </div>
                  <h3 className="text-[26px] font-extrabold text-neutral-900 dark:text-white leading-none">{fmt(reporteCompras.totalComprado)}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">{reporteCompras.cantidadMovimientos} movimientos</span>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-32">
                  <div className="flex items-center gap-2 mb-1">
                    <Receipt className="w-4 h-4 text-neutral-400" />
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Promedio/Compra</p>
                  </div>
                  <h3 className="text-[26px] font-extrabold text-neutral-900 dark:text-white leading-none">{fmt(reporteCompras.promedioCompra)}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">por movimiento</span>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-32">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-neutral-400" />
                    <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Producto Top</p>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-neutral-900 dark:text-white leading-snug mt-1">{reporteCompras.productoMasComprado.nombre}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">{reporteCompras.productoMasComprado.cantidad} unidades</span>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-32">
                  <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Período</p>
                  <h3 className="text-[26px] font-extrabold text-neutral-900 dark:text-white leading-none capitalize">{periodo}</h3>
                  <span className="text-[11px] text-neutral-500 font-medium mt-1">{reporteCompras.compras.length} registro{reporteCompras.compras.length !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Compras table */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
                <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-[14px] font-bold text-neutral-900 dark:text-white">Detalle de Compras / Movimientos de Stock</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="bg-neutral-50 dark:bg-neutral-850/50 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-5">#</th>
                        <th className="py-3 px-5">Fecha</th>
                        <th className="py-3 px-5">Proveedor</th>
                        <th className="py-3 px-5">Producto</th>
                        <th className="py-3 px-5">Cantidad</th>
                        <th className="py-3 px-5">Estado</th>
                        <th className="py-3 px-5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                      {reporteCompras.compras.map((c, i) => (
                        <tr key={i} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                          <td className="py-3 px-5 text-neutral-400 font-mono text-[11px]">{i + 1}</td>
                          <td className="py-3 px-5 text-neutral-500 text-[12px]">{fmtDate(c.fecha)}</td>
                          <td className="py-3 px-5 font-medium text-neutral-800 dark:text-neutral-200">{c.proveedor}</td>
                          <td className="py-3 px-5 text-neutral-600 dark:text-neutral-300">{c.producto}</td>
                          <td className="py-3 px-5 text-neutral-500 font-mono">{c.cantidad}</td>
                          <td className="py-3 px-5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              c.estado === 'Recibido'
                                ? 'border-neutral-300 dark:border-neutral-700 text-neutral-500'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border-transparent'
                            }`}>
                              {c.estado}
                            </span>
                          </td>
                          <td className="py-3 px-5 text-right font-bold text-neutral-900 dark:text-white">{fmt(c.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850/50">
                        <td colSpan={6} className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total General</td>
                        <td className="py-3 px-5 text-right text-[15px] font-extrabold text-neutral-900 dark:text-white">
                          {fmt(reporteCompras.totalComprado)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Alerts panel (always visible) */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 select-none">
              <AlertCircle className="w-4 h-4 text-neutral-500" />
              <h3 className="text-[14px] font-bold text-neutral-950 dark:text-white">Alertas / Notificaciones</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-950/20">
                <Mail className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                  Correo enviado: stock crítico — Leche PIL (3 uds.)
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-950/20">
                <Mail className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                  Correo enviado: stock crítico — Pan Molde (3 uds.)
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-red-100 dark:border-red-950/30 bg-red-50/20 dark:bg-red-950/5">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                  Producto vencido detectado — Yogur Bati 1L
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
