using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain
{
    public class MetodoPagoVenta
    {
        public int Id { get; set; }
        public int MetodoPagoId { get; set; }
        public int VentaId { get; set; }
        public decimal Monto { get; set; }
        public DateTime FechaPago {  get; set; }

        // Propiedades de Navegación
        public virtual MetodoPago? MetodoPago { get; set; }
        public virtual Venta? Venta { get; set; }
    }
}
