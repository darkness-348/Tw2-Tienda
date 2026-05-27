using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain
{
    public class ProductoProveedor
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public int ProveedorId { get; set; }
        public decimal PrecioCompra { get; set; }

        // Propiedades de Navegación
        public virtual Producto? Producto { get; set; }
        public virtual Proveedor? Proveedor { get; set; }
    }
}
