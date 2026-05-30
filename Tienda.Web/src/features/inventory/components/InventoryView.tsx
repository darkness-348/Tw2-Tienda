import { useState } from 'react';
import { AlertCircle, Search, Plus, FileText, Package } from 'lucide-react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../products/hooks/useProducts';
import { useCategorias } from '../../categories/hooks/useCategories';
import type { Product } from '../../products/types/products.types';

interface InventoryViewProps {
  triggerToast: (msg: string) => void;
}

type EstadoProducto = 'Todos' | 'Normal' | 'Stock bajo' | 'Vencido';

const fmtDate = (iso?: string) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const getEstado = (p: Product): 'Normal' | 'Stock bajo' | 'Vencido' => {
  if (p.fechaVencimiento && new Date(p.fechaVencimiento) < new Date()) return 'Vencido';
  if (p.stock <= p.stockMinimo) return 'Stock bajo';
  return 'Normal';
};

const EMPTY_FORM = { nombre: '', descripcion: '', categoriaId: 0, proveedorId: 0, precio: 0, precioProveedor: 0, stock: 0, stockMinimo: 5, codigoProducto: '', fechaVencimiento: '' };

export default function InventoryView({ triggerToast }: InventoryViewProps) {
  const [search, setSearch] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('Todas');
  const [filterEstado, setFilterEstado] = useState<EstadoProducto>('Todos');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  const { data: productsResp, isLoading } = useProducts();
  const { data: categorias = [] } = useCategorias();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const products = productsResp?.data ?? [];

  const criticos = products.filter((p) => getEstado(p) === 'Stock bajo');

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.nombre.toLowerCase().includes(q) || p.codigoProducto.includes(q);
    const matchCat = filterCategoria === 'Todas' || p.categoria.nombre === filterCategoria;
    const matchEst = filterEstado === 'Todos' || getEstado(p) === filterEstado;
    return matchSearch && matchCat && matchEst;
  });

  const openCreate = () => { setEditingId(null); setForm(EMPTY_FORM); setFormError(''); setShowModal(true); };
  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ nombre: p.nombre, descripcion: p.descripcion, categoriaId: p.categoria.id, proveedorId: p.proveedor?.id ?? 0, precio: p.precio, precioProveedor: p.precioProveedor ?? 0, stock: p.stock, stockMinimo: p.stockMinimo, codigoProducto: p.codigoProducto, fechaVencimiento: p.fechaVencimiento ?? '' });
    setFormError('');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim()) { setFormError('El nombre es obligatorio.'); return; }
    if (editingId !== null) {
      await updateProduct.mutateAsync({ id: editingId, ...form });
      triggerToast(`Producto "${form.nombre}" actualizado.`);
    } else {
      await createProduct.mutateAsync(form);
      triggerToast(`Producto "${form.nombre}" registrado.`);
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (confirmDeleteId === null) return;
    const target = products.find((p) => p.id === confirmDeleteId);
    await deleteProduct.mutateAsync(confirmDeleteId);
    triggerToast(`Producto "${target?.nombre}" eliminado.`);
    setConfirmDeleteId(null);
  };

  const estadoBadge = (p: Product) => {
    const est = getEstado(p);
    if (est === 'Normal') return <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Normal</span>;
    if (est === 'Stock bajo') return <span className="px-2.5 py-0.5 rounded-full border border-dashed border-amber-400 text-amber-500 text-[10px] font-bold uppercase tracking-wider animate-pulse">Stock bajo</span>;
    return <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider">Vencido</span>;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Alerta stock crítico */}
      {criticos.length > 0 && (
        <div className="p-4 border border-dashed border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/10 rounded-lg flex items-start gap-3 select-none">
          <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="font-bold">Alerta de stock crítico:</strong>{' '}
            {criticos.length} producto{criticos.length !== 1 ? 's' : ''} por debajo del mínimo —{' '}
            {criticos.map((p) => p.nombre).join(', ')}
          </p>
        </div>
      )}

      {/* Filters + actions */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 select-none">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input type="text" placeholder="Buscar por nombre, código..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none focus:border-neutral-500" />
          </div>
          <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)} className="py-2 px-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none cursor-pointer">
            <option value="Todas">Categoría: Todas</option>
            {categorias.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
          </select>
          <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value as EstadoProducto)} className="py-2 px-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-[13px] outline-none cursor-pointer">
            {(['Todos', 'Normal', 'Stock bajo', 'Vencido'] as const).map((s) => <option key={s} value={s}>{s === 'Todos' ? 'Estado: Todos' : s}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={openCreate} className="flex items-center gap-1.5 py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap">
            <Plus className="w-4 h-4" /><span>Registrar Producto</span>
          </button>
          <button onClick={() => triggerToast('Exportando reporte del inventario...')} className="flex items-center gap-1.5 py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg text-[13px] font-semibold transition-all cursor-pointer text-neutral-600 dark:text-neutral-400">
            <FileText className="w-4 h-4" /><span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-lg shadow-sm overflow-hidden select-none">
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="py-16 text-center text-[13px] text-neutral-400">Cargando inventario...</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-neutral-400">
              <Package className="w-8 h-8 opacity-30" />
              <p className="text-[13px]">No hay productos con los filtros actuales.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-850/50 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Código</th>
                  <th className="py-3.5 px-5">Nombre</th>
                  <th className="py-3.5 px-5">Categoría</th>
                  <th className="py-3.5 px-5">Precio</th>
                  <th className="py-3.5 px-5">Stock</th>
                  <th className="py-3.5 px-5">Mín.</th>
                  <th className="py-3.5 px-5">Estado</th>
                  <th className="py-3.5 px-5">Vencimiento</th>
                  <th className="py-3.5 px-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/20 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-neutral-500 text-[11px]">{p.codigoProducto}</td>
                    <td className="py-3.5 px-5 font-bold text-neutral-900 dark:text-white">{p.nombre}</td>
                    <td className="py-3.5 px-5 text-neutral-500">{p.categoria.nombre}</td>
                    <td className="py-3.5 px-5 text-neutral-600 dark:text-neutral-300 font-mono text-[12px]">Bs {p.precio.toFixed(2)}</td>
                    <td className={`py-3.5 px-5 font-extrabold ${p.stock <= p.stockMinimo ? 'text-red-500' : 'text-neutral-800 dark:text-neutral-200'}`}>{p.stock}</td>
                    <td className="py-3.5 px-5 text-neutral-400 font-mono text-[12px]">{p.stockMinimo}</td>
                    <td className="py-3.5 px-5">{estadoBadge(p)}</td>
                    <td className="py-3.5 px-5 text-neutral-500 font-mono text-[12px]">{fmtDate(p.fechaVencimiento)}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="py-1 px-2.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-[11px] font-semibold transition-colors cursor-pointer">Editar</button>
                        <button onClick={() => setConfirmDeleteId(p.id)} className="py-1 px-2.5 border border-red-200 dark:border-red-950/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded text-[11px] font-semibold transition-colors cursor-pointer">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-6 w-full max-w-lg flex flex-col gap-5 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[16px] font-bold text-neutral-900 dark:text-white">{editingId !== null ? 'Editar Producto' : 'Registrar Producto'}</h2>
            <div className="grid grid-cols-2 gap-4">
              {([['Nombre *', 'nombre'], ['Código de barras', 'codigoProducto'], ['Descripción', 'descripcion']] as [string, string][]).map(([label, key]) => (
                <div key={key} className={`flex flex-col gap-1.5 ${key === 'descripcion' ? 'col-span-2' : ''}`}>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{label}</label>
                  <input type="text" value={(form as Record<string, string | number>)[key] as string} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none focus:border-neutral-500" />
                </div>
              ))}
              {([['Precio (Bs)', 'precio'], ['Precio proveedor', 'precioProveedor'], ['Stock inicial', 'stock'], ['Stock mínimo', 'stockMinimo']] as [string, string][]).map(([label, key]) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{label}</label>
                  <input type="number" min={0} value={(form as Record<string, number>)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: parseFloat(e.target.value) || 0 }))} className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none focus:border-neutral-500" />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Categoría</label>
                <select value={form.categoriaId} onChange={(e) => setForm((f) => ({ ...f, categoriaId: parseInt(e.target.value) }))} className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none">
                  <option value={0}>Seleccionar...</option>
                  {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Fecha de vencimiento</label>
                <input type="date" value={form.fechaVencimiento} onChange={(e) => setForm((f) => ({ ...f, fechaVencimiento: e.target.value }))} className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-[13px] outline-none" />
              </div>
            </div>
            {formError && <p className="text-[12px] text-red-500 font-medium">{formError}</p>}
            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer">Cancelar</button>
              <button onClick={handleSubmit} disabled={createProduct.isPending || updateProduct.isPending} className="py-2 px-4 bg-neutral-700 hover:bg-neutral-800 dark:bg-neutral-200 dark:hover:bg-white text-white dark:text-neutral-950 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-60">
                {(createProduct.isPending || updateProduct.isPending) ? 'Guardando...' : editingId !== null ? 'Guardar Cambios' : 'Registrar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {confirmDeleteId !== null && (() => {
        const target = products.find((p) => p.id === confirmDeleteId);
        if (!target) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setConfirmDeleteId(null)}>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-6 w-full max-w-sm flex flex-col gap-4 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-[15px] font-bold text-neutral-900 dark:text-white">¿Eliminar producto?</h2>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400">Se eliminará permanentemente <strong className="text-neutral-800 dark:text-neutral-200">"{target.nombre}"</strong>. Esta acción no se puede deshacer.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setConfirmDeleteId(null)} className="py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-[13px] font-semibold text-neutral-600 transition-colors cursor-pointer">Cancelar</button>
                <button onClick={handleDelete} disabled={deleteProduct.isPending} className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-60">{deleteProduct.isPending ? 'Eliminando...' : 'Eliminar'}</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
