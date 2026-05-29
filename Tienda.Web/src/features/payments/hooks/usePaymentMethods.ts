import { useState, useEffect, useCallback } from 'react';
import type { MetodoPago, MetodoPagoFormData } from '../types';
import { paymentsService } from '../services/paymentsService';

export function usePaymentMethods() {
  const [payments, setPayments] = useState<MetodoPago[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await paymentsService.getAll();
    setPayments(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(async (data: MetodoPagoFormData) => {
    const updated = await paymentsService.create(data);
    setPayments(updated);
  }, []);

  const update = useCallback(async (id: number, data: MetodoPagoFormData) => {
    const updated = await paymentsService.update(id, data);
    setPayments(updated);
  }, []);

  const toggleEstado = useCallback(async (id: number) => {
    const updated = await paymentsService.toggleEstado(id);
    setPayments(updated);
  }, []);

  const remove = useCallback(async (id: number) => {
    const updated = await paymentsService.delete(id);
    setPayments(updated);
  }, []);

  return { payments, loading, create, update, toggleEstado, remove };
}
