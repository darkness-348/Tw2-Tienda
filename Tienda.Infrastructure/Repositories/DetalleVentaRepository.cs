using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class DetalleVentaRepository : IDetalleVentaRepository
    {
        private readonly TiendaDBContext _tienda;
        public DetalleVentaRepository(TiendaDBContext tienda)
        {
            _tienda= tienda;
        }
        public async Task<bool> RegistrarDetalleVenta(DetalleVenta detalleVenta)
        {
            if (detalleVenta is null) return false;
            _tienda.DetalleVentas.Add(detalleVenta);
            await _tienda.SaveChangesAsync();
            return true;
        }
    }
}
