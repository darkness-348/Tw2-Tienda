using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Application.Dtos;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class ProductoProveedorRepository : IProductoProveedorRepository
    {
        private readonly TiendaDBContext _context;
        public ProductoProveedorRepository(TiendaDBContext context)
        {
            _context=context;
        }

        public async Task<ProductoProveedor> AddProductoProveedor(ProductoProveedor productoProveedor)
        {
            await _context.ProductosProveedores.AddAsync(productoProveedor);
            await _context.SaveChangesAsync();
            return productoProveedor;
        }
    }
}