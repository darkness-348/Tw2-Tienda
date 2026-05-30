using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Interfaces
{
    public interface IProductoProveedorRepository
    {
        Task<ProductoProveedor> AddProductoProveedor(ProductoProveedor productoProveedor);
    }
}