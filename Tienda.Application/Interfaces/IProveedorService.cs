using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Application.Dtos;

namespace Tienda.Application.Interfaces
{
    public interface IProveedorService
    {
        Task<List<ProveedorDTO>> GetAllProveedoresAsync();
        Task<ProveedorDTO?> GetByCodigoProveedorAsync(string codigoProveedor);
        Task<ProveedorDTO> AddProveedorAsync(CrearProveedorRequest request);
        Task<ProveedorDTO?> UpdateProveedorAsync(string codigoProveedor, UpdateProveedorRequest request);
        Task<ProveedorDTO?> DeleteProveedorAsync(string codigoProveedor);
    }
}
