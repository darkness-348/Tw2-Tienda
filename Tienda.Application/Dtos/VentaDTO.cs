using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Dtos
{
    public class VentaDTO
    {
        //para obtener el id del usuario(cajero) se tendria que obtener el jwt de ese usuario y buscarlo    
          
        public decimal Total { get; set; }
        public EstadoVenta Estado { get; set; }
        public string Descripcion { get; set; } // boleto/factura

    }
    public class IdVentaDTO
    {
        public int IdVenta { get; set; }
        public decimal Total { get; set; }
        public EstadoVenta Estado { get; set; }
        public string Descripcion { get; set; }
    }
    public class PostVentaDTO
    {
        public VentaDTO Venta { get; set; }
        public MetodoPagoVentaDTO MetodoPago { get; set; }
        public List<DetalleVentaDTO> Detalle { get; set; }

    }

    public class GetVentaDTO 
    {
        public decimal Total { get; set; }
        public DateTime FechaCompra { get; set; }
    }

    public class ViewVentaDTO
    {
        public GetVentaDTO Venta { get; set; }
        public GetMetodoPagoVentaDTO MetodoPago { get; set; }
        public List<DetalleVentaDTO> Detalle { get; set; }

    }

}
