using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain
{
    public class DetalleVenta
    {
        public int Id { get; set; } 
        public int ProductoId {  get; set; }
        public int VentaId { get; set; }
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }

        // Propiedades de Navegación
        public virtual Producto? Producto { get; set; }
        public virtual Venta? Venta { get; set; }
    }
}
