using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain
{
    public enum EstadoProveedor
    {
        Activo,
        Inactivo
    }
    public class Proveedor
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Relacion { get; set; } = string.Empty;
        public EstadoProveedor EstadoProveedor { get; set; }

        // Propiedades de Navegación
        public virtual ICollection<ProductoProveedor> ProductosProveedor { get; set; } = new List<ProductoProveedor>();
    }
}
