using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Interfaces
{
    public interface IMetodoPagoRepository
    {
        Task<MetodoPago> ObtenerMetodoPago(string nombrePago);
    }
}