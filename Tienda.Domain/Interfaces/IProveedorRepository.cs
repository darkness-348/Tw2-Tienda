using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Domain.Entitys;

namespace Tienda.Domain.Interfaces
{
    public interface IProveedorRepository
    {
        Task<Proveedor> GetByCodigoProveedorAsync(string CodigoProveedor);
        Task<Proveedor> AddProveedor(Proveedor proveedor);
    }
}