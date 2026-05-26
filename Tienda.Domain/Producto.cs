using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Domain
{
    public enum EstadoProducto
    {
        Caducado,
        Bueno

    };
    public class Producto
    {
        public int Id { get; set; }
        public int CategoriaId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion {  get; set; } = string.Empty;

        public DateTime FechaVencimiento { get; set; }
        public EstadoProducto EstadoProducto { get; set; }
        public string CodigoBarras { get; set; } = string.Empty;

        // Propiedades de Navegación
        public virtual Categoria? Categoria { get; set; }
        public virtual ICollection<MovimientoStock> MovimientosStock { get; set; } = new List<MovimientoStock>();
        public virtual ICollection<ProductoProveedor> ProductosProveedor { get; set; } = new List<ProductoProveedor>();
        public virtual ICollection<DetalleVenta> DetallesVenta { get; set; } = new List<DetalleVenta>();
}
