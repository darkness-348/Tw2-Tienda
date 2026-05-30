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
            return await _context.Set<Proveedor>().FirstOrDefaultAsync(p => p.CodigoProveedor == CodigoProvedor);
        }

        public async Task<Proveedor?> UpdateProveedor(string CodigoProveedor, Proveedor proveedor)
        {
            var existente = await _context.Set<Proveedor>().FirstOrDefaultAsync(p => p.CodigoProveedor == CodigoProveedor);
            if (existente == null)
            {
                return null;
            }

            existente.Nombre = proveedor.Nombre;
            existente.Direccion = proveedor.Direccion;
            existente.Telefono = proveedor.Telefono;
            existente.Relacion = proveedor.Relacion;
            existente.EstadoProveedor = proveedor.EstadoProveedor;

            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task<Proveedor?> DeleteProveedor(string CodigoProveedor)
        {
            var existente = await _context.Set<Proveedor>().FirstOrDefaultAsync(p => p.CodigoProveedor == CodigoProveedor);
            if (existente == null)
            {
                return null;
            }

            existente.EstadoProveedor = EstadoProveedor.Inactivo;
            await _context.SaveChangesAsync();
            return existente;
        }
    }
}