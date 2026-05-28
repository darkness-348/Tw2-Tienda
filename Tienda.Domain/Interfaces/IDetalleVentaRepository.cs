using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Domain.Interfaces
{
    public interface IDetalleVentaRepository
    {
        Task<bool> RegistrarDetalleVenta(DetalleVenta detalleVenta);
    }
}
