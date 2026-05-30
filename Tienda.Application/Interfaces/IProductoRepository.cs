using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Interfaces
{
    public interface IProductoRepository
    {
        Task<Producto?> GetByCodigoBarrasAsync(string CodigoBarras);
        Task<Producto> AddProducto(Producto producto);
        Task<List<Producto>> GetAllProductosAsync();

        Task<List<Producto>> ObtenerPorNombres(List<string> nombres); 

        Task<Producto?> SetEstadoProductoByCodigoBarrasAsync(string CodigoBarras, EstadoProducto estado);
        Task<Producto> UpdateProducto(string codigoBarras,Producto producto);
        Task<int> GetStockDisponibleAsync(string codigoBarras);
        Task<List<(string CodigoBarras, string NombreProducto, int StockDisponible)>> GetInventarioAsync();

    }
}