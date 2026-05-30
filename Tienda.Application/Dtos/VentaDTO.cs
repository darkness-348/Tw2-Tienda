using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Dtos
{
    public class VentaDTO
    {
        public decimal Total { get; set; }
        public EstadoVenta Estado { get; set; }
        public string Descripcion { get; set; }
    }

    public class ReporteVentaDiaDTO
    {
        public int Id { get; set; }
        public string EmailUsuario { get; set; } = string.Empty;
        public string NombreCliente { get; set; } = string.Empty;
        public DateTime FechaVenta { get; set; }
        public decimal Total { get; set; }
        public string EstadoVenta { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string MetodoPago { get; set; } = string.Empty;
        public List<DetalleVentaDTO> Detalles { get; set; } = new List<DetalleVentaDTO>();
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
