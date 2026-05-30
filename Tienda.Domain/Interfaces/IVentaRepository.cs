using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Domain.Interfaces
{
    public interface IVentaRepository
    {
        Task<List<Venta>> GetAllVentas();
        Task<Venta> GetVentaById(int idVenta);
        Task<int> RegistrarVenta(Venta venta);
        Task<List<Venta>> GetVentasDiaAsync(DateTime fecha);
 
    }
}
