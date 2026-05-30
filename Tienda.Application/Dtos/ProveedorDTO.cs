using System;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Dtos
{
    public class ProveedorDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Relacion { get; set; } = string.Empty;
        public string CodigoProveedor { get; set; } = string.Empty;
        public EstadoProveedor Estado { get; set; }
    }

    public class CrearProveedorRequest
    {
        public string Nombre { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Relacion { get; set; } = string.Empty;
        public string CodigoProveedor { get; set; } = string.Empty;
    }

    public class UpdateProveedorRequest
    {
        public string Nombre { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Relacion { get; set; } = string.Empty;
        public EstadoProveedor Estado { get; set; }
    }
}
