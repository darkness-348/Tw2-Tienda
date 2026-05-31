using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Dtos
{
    public class ProductoDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public DateTime FechaVencimiento { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public string Disponibilidad { get; set; } = string.Empty;
    }
    public class CrearProductoRequest
    {
        public string CodigoProvedor { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;

        public DateTime FechaVencimiento { get; set; }
        public string CodigoBarras { get; set; } = string.Empty;
        public decimal PrecioCompra { get; set; }
    }
    public class UpdateProductoRequest
    {
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;

        public DateTime FechaVencimiento { get; set; }
        public EstadoProducto EstadoProducto { get; set; }

    }
}