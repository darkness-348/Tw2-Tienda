using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    internal class VentaRepository : IVentaRepository
    {
        private readonly TiendaDBContext _venta;
        public VentaRepository(TiendaDBContext venta)
        {
            _venta = venta;
        }

    

        public async Task<int> RegistrarVenta(Venta venta1)
        {
            _venta.Ventas.Add(venta1);
            await _venta.SaveChangesAsync();
            //una vez guardado se actualiza su id del objeto en memoria
            return venta1.Id;
        }
    }
}
