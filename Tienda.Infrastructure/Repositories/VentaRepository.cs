using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

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
            if (venta1 is null)
            {
                throw new Exception();
            }
            _venta.Ventas.Add(venta1);
            await _venta.SaveChangesAsync();
            return venta1.Id;
        }

        public async Task<List<Venta>> GetVentasDiaAsync(DateTime fecha)
        {
            var inicioDia = fecha.Date;
            var finDia = fecha.Date.AddDays(1).AddTicks(-1);
            return await _venta.Ventas
                .Include(v => v.Usuario)
                .Include(v => v.Persona)
                .Include(v => v.DetallesVenta)
                    .ThenInclude(d => d.Producto)
                .Include(v => v.MetodosPagoVenta)
                    .ThenInclude(mp => mp.MetodoPago)
                .Where(v => v.FechaVenta >= inicioDia && v.FechaVenta <= finDia)
                .ToListAsync();
        }
      
    }
}
