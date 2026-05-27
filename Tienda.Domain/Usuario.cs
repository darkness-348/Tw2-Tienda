using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain
{
    public enum Rol
    {
        Gerente,
        EncargadoAlmacen,
        Cajero,
        Cliente
    };

    public enum Estado
    {
        Activo,
        Inactivo
    }
    public class Usuario
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public Rol Rol { get; set; }
        public Estado Estado { get; set; }

        // Propiedades de Navegación
        public virtual Persona? Persona { get; set; }
        public virtual ICollection<Venta> Ventas { get; set; } = new List<Venta>();
        public virtual ICollection<MovimientoStock> MovimientosStock { get; set; } = new List<MovimientoStock>();
    }
}
