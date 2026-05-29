using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Domain.Entitys;

namespace Tienda.Domain.Interfaces
{
    public interface IProductoRepository
    {
        Task<Producto> GetByCodigoProducotAsync(string CodigoProducto);
        Task<Producto> AddProducto(Producto producto);
        Task<List<Producto>> GetAllProductosAsync();
        Task<List<Producto>> ObtenerPorNombres(List<string> nombres); 
    }
}