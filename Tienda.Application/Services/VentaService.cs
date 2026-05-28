using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Application.Dtos;
using Tienda.Application.Interfaces;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Application.Services
{
    public class VentaService
    {
        private readonly IVentaRepository _venta;
        private readonly IUsuarioRepository _usuario;
      
        public VentaService(IVentaRepository venta,IUsuarioRepository usuario )
        {
            _venta= venta;
            _usuario= usuario;
        
        }
        public async Task<bool> RegistrarVenta(VentaDTO ventaDto,int idUser,List<DetalleVentaDTO> detalleVentaDTOs)
        {
            Usuario user = await _usuario.ObtenerIdSegunJWT(idUser);

            if (user is null) return false;

            Venta venta = new Venta
            {
                UsuarioId = user.Id,
                Descripcion = ventaDto.Descripcion,
                EstadoVenta = ventaDto.Estado,
                Total = ventaDto.Total,
                FechaVenta = DateTime.Now,
                Usuario=user,

            };
            int idVenta = await _venta.RegistrarVenta(venta);
            foreach (var item in detalleVentaDTOs)
            {
                DetalleVenta dv = new DetalleVenta
                {
                    VentaId=idVenta,
                    Venta=venta,
                    Cantidad=item.Cantidad,
                    Precio=item.Precio,
                    
                };
            }
            return true;
        }
     
    }
}
