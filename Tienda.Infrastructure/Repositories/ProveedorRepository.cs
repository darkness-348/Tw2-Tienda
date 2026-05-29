using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class ProveedorRepository: IProveedorRepository
    {
        private readonly TiendaDBContext _context;
        public ProveedorRepository(TiendaDBContext context)
        {
            _context=context;
        }

        public async Task<Proveedor> AddProveedor(Proveedor provedor)
        {
            await _context.AddAsync(provedor);
            await _context.SaveChangesAsync();
            return provedor;
        }

        public async Task<List<Proveedor>> AllProveedorAsync()
        {
            return await _context.Set<Proveedor>().Where(p => p.EstadoProveedor == EstadoProveedor.Activo).ToListAsync();
        }

        public async Task<Proveedor?> GetByCodigoProveedorAsync(string CodigoProvedor)
        {
            return await _context.Set<Proveedor>().FirstOrDefaultAsync(p => p.CodigoProveedor==CodigoProvedor);
        }
    }
}