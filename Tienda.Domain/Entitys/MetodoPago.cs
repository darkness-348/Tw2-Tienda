using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain.Entitys
{
    public enum EstadoMetodoPago
    {
        Activo,
        Inactivo,
        Caducado
    }
    public class MetodoPago
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descipcion {  get; set; } = string.Empty;
        public EstadoMetodoPago EstadoMetodoPago { get; set; }

        // Propiedades de Navegación
        public virtual ICollection<MetodoPagoVenta> MetodosPagoVenta { get; set; } = new List<MetodoPagoVenta>();
    }
}
