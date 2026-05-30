using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Interfaces
{
    public interface IMetodoPagoVentaRepository
    {
        Task<bool> SaveMetodoPagoVenta(MetodoPagoVenta metodoPagoVenta);
    }
}