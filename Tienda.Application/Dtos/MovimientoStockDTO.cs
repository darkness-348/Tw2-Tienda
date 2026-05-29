using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tienda.Application.Dtos
{
    public class MovimientoStockDTO
    {
        public string NombreProducto { get; set; } = string.Empty;
        public string CorreoUsuario { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
    }
    public class CrearMovimientoStockRequest
    {
        public string CodigoBarras { get; set; } = string.Empty;

        public int Cantidad { get; set; }

        public DateTime FechaEntrega { get; set; }

        public string Descripcion { get; set; } = string.Empty;

        public decimal Total { get; set; }

        public string Unidades { get; set; } = string.Empty;

        public string TipoMovimiento { get; set; } = string.Empty;
    }

    public class ProveedorDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string CodigoProveedor { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
    }
    public class UpdateMovimientoStock
    {
        public string CodigoBarras { get; set; } = string.Empty;
        public string CorreoUsuario { get; set; } = string.Empty;
        public DateTime FechaEntrega { get; set; }

        public string Descripcion { get; set; } = string.Empty;

        public decimal Total { get; set; }

        public string Unidades { get; set; } = string.Empty;

        public string TipoMovimiento { get; set; } = string.Empty;

        public string Estado { get; set; } = string.Empty;

    }
}