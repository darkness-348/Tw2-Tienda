using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class VentaRepository : IVentaRepository
    {
        private readonly TiendaDBContext _venta;
        public VentaRepository(TiendaDBContext venta)
        {
            _venta = venta;
        }

        public async Task<List<Venta>> GetAllVentas()
        {
            return await _venta.Ventas.ToListAsync();
        }

        public async Task<Venta?> GetVentaById(int idVenta)
        {
            return await _venta.Ventas.FirstOrDefaultAsync(v=>v.Id==idVenta);
        }

        public async Task<int> RegistrarVenta(Venta venta1)
        {
            if (venta1 is null) throw new Exception();
            _venta.Ventas.Add(venta1);
            await _venta.SaveChangesAsync();
            //una vez guardado se actualiza su id del objeto en memoria
            return venta1.Id;
        }
      
    }
}
