using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly TiendaDBContext _context;
        public ProductoRepository(TiendaDBContext context)
        {
            _context = context;
        }

        public async Task<Producto> AddProducto(Producto producto)
        {
            await _context.Productos.AddAsync(producto);
            await _context.SaveChangesAsync();
            return producto;
        }

        public async Task<Producto?> GetByCodigoBarrasAsync(string CodigoBarras)
        {
            return await _context.Set<Producto>().FirstOrDefaultAsync(p => p.CodigoBarras == CodigoBarras && p.EstadoProducto != EstadoProducto.Caducado);
        }

        public async Task<List<Producto>> GetAllProductosAsync()
        {
            return await _context.Productos
                .Include(p => p.Categoria)
                .Include(p => p.ProductosProveedores)
                .Include(p => p.MovimientosStock)
                .Where(p => p.EstadoProducto == EstadoProducto.Bueno)
                .ToListAsync();
        }
//oh yeah
        public async Task<Producto?> SetEstadoProductoByCodigoBarrasAsync(string CodigoBarras, EstadoProducto estado)
        {
            var producto = await _context.Productos
                .Include(p => p.Categoria)
                .Include(p => p.ProductosProveedores)
                .Include(p => p.MovimientosStock)
                .FirstOrDefaultAsync(p => p.CodigoBarras == CodigoBarras);

            if (producto is null)
            {
                return null;
            }

            producto.EstadoProducto = estado;
            await _context.SaveChangesAsync();
            return producto;
        }

        public async Task<Producto> UpdateProducto(string codigoBarras, Producto producto)
        {
            var productoExistente = await _context.Productos
                .Include(p => p.Categoria)
                .Include(p => p.ProductosProveedores)
                .Include(p => p.MovimientosStock)
                .FirstOrDefaultAsync(p => p.CodigoBarras == codigoBarras);
            if (productoExistente is null)
            {
                return null;
            }

            productoExistente.Nombre = producto.Nombre;
            productoExistente.Descripcion = producto.Descripcion;
            productoExistente.FechaVencimiento = producto.FechaVencimiento;
            productoExistente.EstadoProducto = producto.EstadoProducto;

            await _context.SaveChangesAsync();

            return productoExistente;
        }

        public async Task<int> GetStockDisponibleAsync(string codigoBarras)
        {
            var producto = await _context.Productos
                .FirstOrDefaultAsync(p => p.CodigoBarras == codigoBarras);

            if (producto is null)
            {
                throw new Exception("Producto no encontrado.");
            }

            var entradas = await _context.MovimientoStocks
                .Where(m =>
                    m.ProductoId == producto.Id &&
                    m.TipoMovimiento == "Entrada")
                .SumAsync(m => m.Cantidad);

            var salidas = await _context.MovimientoStocks
                .Where(m =>
                    m.ProductoId == producto.Id &&
                    m.TipoMovimiento == "Salida")
                .SumAsync(m => m.Cantidad);

            return (entradas - salidas);
        }

        public async Task<List<(string CodigoBarras, string NombreProducto, int StockDisponible)>> GetInventarioAsync()
        {
            var query = from p in _context.Productos
                        where p.EstadoProducto == EstadoProducto.Bueno
                        join m in _context.MovimientoStocks on p.Id equals m.ProductoId into movs
                        select new
                        {
                            p.CodigoBarras,
                            p.Nombre,
                            Entradas = movs.Where(x => x.TipoMovimiento == "Entrada").Sum(x => (int?)x.Cantidad) ?? 0,
                            Salidas = movs.Where(x => x.TipoMovimiento == "Salida").Sum(x => (int?)x.Cantidad) ?? 0
                        };

            var list = await query.ToListAsync();

            return list.Select(x => (x.CodigoBarras, x.Nombre, x.Entradas - x.Salidas)).ToList();
        }


        public async Task<List<Producto>> ObtenerPorNombres(List<string> nombres)
        {
            if (nombres == null || nombres.Count == 0)
                return new List<Producto>();

            return await _context.Productos
                .Where(p => nombres.Contains(p.Nombre))
                .Include(p => p.Categoria)
                .ToListAsync();
        }

    }
}