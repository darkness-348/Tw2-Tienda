using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;

        // Propiedades de Navegación
        public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
    }
}
