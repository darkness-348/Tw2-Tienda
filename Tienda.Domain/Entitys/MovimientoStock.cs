using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain.Entitys
{
    public enum EstadoMovimientoStock
    {
        Completado,
        Pendiente
    }
    public class MovimientoStock
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public int UsuarioId { get; set; }
        public int Cantidad { get; set; }
        public DateTime FechaEntrega { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public EstadoMovimientoStock EstadoMovimientoStock { get; set; }
        public decimal Total { get; set; }
        public string Unidades { get; set; } = string.Empty;
        public string TipoMovimiento { get; set; } = string.Empty;

        // Propiedades de Navegación
        public virtual Producto? Producto { get; set; }
        public virtual Usuario? Usuario { get; set; }

    }
}
