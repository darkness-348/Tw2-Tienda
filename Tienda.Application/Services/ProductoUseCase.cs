using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Application.Dtos;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Application.Services
{
    public class ProductoUseCase
    {
        private readonly IProductoRepository _producto;
        private readonly IProductoProveedorRepository _productoproveedor;
        private readonly IProveedorRepository _proveedor;
        private readonly ICategoriaRepository _categoria;
        public ProductoUseCase(IProductoRepository producto, IProductoProveedorRepository productoProvedor, IProveedorRepository provedor, ICategoriaRepository categoria)
        {
            _producto = producto;
            _productoproveedor = productoProvedor;
            _proveedor = provedor;
            _categoria = categoria;
        }
        public async Task<ProductoDTO> AddProducto(CrearProductoRequest productoRequest)
        {

            var categoria = await _categoria
                .GetByCategoriaNombre(productoRequest.Categoria);

            if (categoria is null)
            {
                throw new Exception("La categoría no existe.");
            }

            var provedor = await _proveedor
                .GetByCodigoProveedorAsync(productoRequest.CodigoProvedor);

            if (provedor is null)
            {
                throw new Exception("El proveedor no existe.");
            }

            var productoExistente = await _producto
                .GetByCodigoProducotAsync(productoRequest.CodigoProducto);

            if (productoExistente is not null)
            {
                throw new Exception("Ya existe un producto con ese código.");
            }

            var producto = new Producto
            {
                CategoriaId = categoria.Id,
                Nombre = productoRequest.Nombre,
                Descripcion = productoRequest.Descripcion,
                FechaVencimiento = productoRequest.FechaVencimiento,
                CodigoBarras = productoRequest.CodigoBarras,
                CodigoProducto = productoRequest.CodigoProducto,
                EstadoProducto = EstadoProducto.Bueno
            };

            var productoCreado = await _producto
                .AddProducto(producto);

            var productoProvedor = new ProductoProveedor
            {
                ProductoId = productoCreado.Id,
                ProveedorId = provedor.Id,
                PrecioCompra = productoRequest.PrecioCompra
            };

            await _productoproveedor
                .AddProductoProveedor(productoProvedor);

            // var movimiento = new MovimientoStock
            // {
            //     ProductoId = productoCreado.Id,
            //     UsuarioId = usuarioId,
            //     Cantidad = productoRequest.Cantidad,
            //     FechaEntrega = DateTime.UtcNow,
            //     Descripcion = "Registro inicial del producto",
            //     EstadoMovimientoStock = EstadoMovimientoStock.Completado,
            //     Total = productoRequest.PrecioCompra * productoRequest.Cantidad,
            //     Unidades = "Unidad",
            //     TipoMovimiento = "Entrada"
            // };

            // await _movimientoStockRepository
            //     .AddMovimientoAsync(movimiento);

            return new ProductoDTO
            {
                Nombre = productoCreado.Nombre,
                Categoria = categoria.Nombre
            };
        }

        public async Task<List<ProductoDTO>> GetAllProductos()
        {
            var productos = await _producto.GetAllProductosAsync();
            
            var productosDTO = new List<ProductoDTO>();
            
            foreach (var producto in productos)
            {
                productosDTO.Add(new ProductoDTO
                {
                    Nombre = producto.Nombre,
                    Categoria = producto.Categoria?.Nombre ?? "Sin categoría"
                });
            }
            
            return productosDTO;
        }

    }
}