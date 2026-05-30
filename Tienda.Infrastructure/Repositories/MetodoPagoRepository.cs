using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class MetodoPagoRepository : IMetodoPagoRepository
    {
        private readonly TiendaDBContext _metodoPago;
        public MetodoPagoRepository(TiendaDBContext metodoPago)
        {
            _metodoPago = metodoPago;
        }

        public async Task<MetodoPago?> ObtenerMetodoPago(string nombrePago)
        {
            return await _metodoPago.MetodoPagos.FirstOrDefaultAsync(mp=>mp.Nombre==nombrePago);
        }
    }
}
