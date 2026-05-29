using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

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

        public async Task<Producto?> GetByCodigoProducotAsync(string CodigoProducto)
        {
            return await _context.Set<Producto>().FirstOrDefaultAsync(p => p.CodigoProducto == CodigoProducto);
        }

        public async Task<List<Producto>> GetAllProductosAsync()
        {
            return await _context.Productos.Include(p => p.Categoria).ToListAsync();
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