using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tienda.Application.Dtos
{
    public class ProductoProvedorDTO
    {
        public string NombreProvedor { get; set; } = string.Empty;
        public string NombreProducto { get; set; } = string.Empty;
    }
    public class StockProductoDTO
    {
        public string CodigoBarras { get; set; } = string.Empty;
        public int StockDisponible { get; set; }
        public string NombreProducto { get; set; } = string.Empty;

        public StockProductoDTO()
        {
        }

        public StockProductoDTO(string codigoBarras, int stockDisponible, string nombreProducto = "")
        {
            CodigoBarras = codigoBarras;
            StockDisponible = stockDisponible;
            NombreProducto = nombreProducto;
        }
    }

}