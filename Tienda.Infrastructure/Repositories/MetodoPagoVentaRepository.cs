using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class MetodoPagoVentaRepository:IMetodoPagoVentaRepository
    {
        private readonly TiendaDBContext _metodoPagoVenta;
        public MetodoPagoVentaRepository(TiendaDBContext metodoPagoVenta)
        {
            _metodoPagoVenta = metodoPagoVenta;
        }

        public async Task<bool> SaveMetodoPagoVenta(MetodoPagoVenta metodoPagoVenta)
        {
            if (metodoPagoVenta is null) return false;
            _metodoPagoVenta.MetodoPagoVentas.Add(metodoPagoVenta);
            await _metodoPagoVenta.SaveChangesAsync();
            return true;
        }
    }
}
