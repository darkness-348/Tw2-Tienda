using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Application.Dtos
{
    public class MetodoPagoVentaDTO
    {

        public string Nombre{ get; set; }
        public decimal Monto { get; set; }
        public DateTime FechaPago { get; set; }

    }
    public class GetMetodoPagoVentaDTO
    {
        public string Nombre { get; set; }
    }
}
