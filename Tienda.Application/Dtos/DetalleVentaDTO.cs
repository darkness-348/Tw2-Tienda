using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Application.Dtos
{
    public class DetalleVentaDTO
    {
        public string NombreProducto { get; set; }
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal { get;set;}
    }
}
