using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Application.Dtos;

namespace Tienda.Application.Interfaces
{
    public interface IProductoService
    {
        Task<List<ProductoDTO>> GetProductosDisponiblesAsync();
        Task<List<ProductoDTO>> FiltrarProductosAsync(string? nombre, string? categoria);
    }
}
