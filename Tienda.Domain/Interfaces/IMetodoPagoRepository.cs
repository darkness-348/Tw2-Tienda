using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Domain.Interfaces
{
    public interface IMetodoPagoRepository
    {
        Task<MetodoPago> ObtenerMetodoPago(string nombrePago);
    }
}
