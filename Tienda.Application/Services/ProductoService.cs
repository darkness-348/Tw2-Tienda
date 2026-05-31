using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Application.Dtos;
using Tienda.Application.Interfaces;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Application.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IProductoRepository _productoRepository;

        public ProductoService(IProductoRepository productoRepository)
        {
            _productoRepository = productoRepository;
        }

        public async Task<List<ProductoDTO>> GetProductosDisponiblesAsync()
        {
            var productos = await _productoRepository.GetAllProductosAsync();
            return productos.Select(p =>
            {
                var stock = p.MovimientosStock.Where(m => m.TipoMovimiento == "Entrada").Sum(m => m.Cantidad)
                          - p.MovimientosStock.Where(m => m.TipoMovimiento == "Salida").Sum(m => m.Cantidad);
                return new ProductoDTO
                {
                    Nombre = p.Nombre,
                    Categoria = p.Categoria?.Nombre ?? string.Empty,
                    FechaVencimiento = p.FechaVencimiento,
                    Precio = p.ProductosProveedores.FirstOrDefault()?.PrecioCompra ?? 0,
                    Stock = stock,
                    Disponibilidad = stock > 0 ? "Disponible" : "Agotado"
                };
            }).ToList();
        }

        public async Task<List<ProductoDTO>> FiltrarProductosAsync(string? nombre, string? categoria)
        {
            var productos = await _productoRepository.GetAllProductosAsync();

            var consulta = productos.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(nombre))
            {
                consulta = consulta.Where(p => p.Nombre.Contains(nombre, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrWhiteSpace(categoria))
            {
                consulta = consulta.Where(p => p.Categoria != null && p.Categoria.Nombre.Contains(categoria, StringComparison.OrdinalIgnoreCase));
            }

            return consulta.Select(p =>
            {
                var stock = p.MovimientosStock.Where(m => m.TipoMovimiento == "Entrada").Sum(m => m.Cantidad)
                          - p.MovimientosStock.Where(m => m.TipoMovimiento == "Salida").Sum(m => m.Cantidad);
                return new ProductoDTO
                {
                    Nombre = p.Nombre,
                    Categoria = p.Categoria?.Nombre ?? string.Empty,
                    FechaVencimiento = p.FechaVencimiento,
                    Precio = p.ProductosProveedores.FirstOrDefault()?.PrecioCompra ?? 0,
                    Stock = stock,
                    Disponibilidad = stock > 0 ? "Disponible" : "Agotado"
                };
            }).ToList();
        }
    }
}
