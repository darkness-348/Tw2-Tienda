using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain.Entitys
{
    public class Persona
    {
        public int Id { get; set; }
        public string Ci { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;

        // Propiedades de Navegación
        public virtual Usuario? Usuario { get; set; }
        public virtual ICollection<Venta> Ventas { get; set; } = new List<Venta>();
    }
}
