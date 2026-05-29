import { useState, useEffect, useCallback } from 'react';
import type { VentaReporte, CompraReporte, EstadisticasVentas, EstadisticasCompras, PeriodoReporte, TipoReporte } from '../types';
import { reportsService } from '../services/reportsService';

export function useReports() {
  const [periodo, setPeriodo] = useState<PeriodoReporte>('diario');
  const [tipoReporte, setTipoReporte] = useState<TipoReporte>('ventas');
  const [ventas, setVentas] = useState<VentaReporte[]>([]);
  const [compras, setCompras] = useState<CompraReporte[]>([]);
  const [statsVentas, setStatsVentas] = useState<EstadisticasVentas | null>(null);
  const [statsCompras, setStatsCompras] = useState<EstadisticasCompras | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [v, c] = await Promise.all([
      reportsService.getVentas(periodo),
      reportsService.getCompras(periodo),
    ]);
    setVentas(v);
    setCompras(c);
    setStatsVentas(reportsService.calcularEstadisticasVentas(v));
    setStatsCompras(reportsService.calcularEstadisticasCompras(c));
    setLoading(false);
  }, [periodo]);

  useEffect(() => { load(); }, [load]);

  return {
    periodo,
    setPeriodo,
    tipoReporte,
    setTipoReporte,
    ventas,
    compras,
    statsVentas,
    statsCompras,
    loading,
  };
}
