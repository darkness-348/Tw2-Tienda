using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain
{
    public enum EstadoVenta
    {
        Completada,
        Pendiente
    }
    public class Venta
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int? PersonaId { get; set; }
        public DateTime FechaVenta { get; set; }
        public decimal Total {  get; set; }
        public EstadoVenta EstadoVenta { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        
        // Propiedades de Navegación
        public virtual Usuario? Usuario { get; set; }
        public virtual Persona? Persona { get; set; }
        public virtual ICollection<DetalleVenta> DetallesVenta { get; set; } = new List<DetalleVenta>();
        public virtual ICollection<MetodoPagoVenta> MetodosPagoVenta { get; set; } = new List<MetodoPagoVenta>();
}
