using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Application.Dtos;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Application.Services
{
    public class ProductoUseCase
    {
        private readonly IProductoRepository _producto;
        private readonly IProductoProveedorRepository _productoproveedor;
        private readonly IProveedorRepository _proveedor;
        private readonly ICategoryRepository _categoria;
        public ProductoUseCase(IProductoRepository producto, IProductoProveedorRepository productoProvedor, IProveedorRepository provedor, ICategoryRepository categoria)
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
                .GetByCodigoBarrasAsync(productoRequest.CodigoBarras);

            if (productoExistente is not null)
            {
                throw new Exception("Ya existe un producto con ese código de barras.");
            }

            var producto = new Producto
            {
                CategoriaId = categoria.Id,
                Nombre = productoRequest.Nombre,
                Descripcion = productoRequest.Descripcion,
                FechaVencimiento = productoRequest.FechaVencimiento,
                CodigoBarras = productoRequest.CodigoBarras,
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

        public async Task<ProductoDTO> DeleteProducto(string codigoBarras)
        {
            var producto = await _producto.GetByCodigoBarrasAsync(codigoBarras);
            if (producto is null)
            {
                throw new Exception("El producto no existe.");
            }

            var productoEliminado = await _producto.SetEstadoProductoByCodigoBarrasAsync(codigoBarras, EstadoProducto.Caducado);
            if (productoEliminado is null)
            {
                throw new Exception("No se pudo eliminar el producto.");
            }

            return new ProductoDTO
            {
                Nombre = productoEliminado.Nombre,
                Categoria = productoEliminado.Categoria?.Nombre ?? "Sin categoría"
            };
        }
        public async Task<ProductoDTO> UpdateProducto(
            string codigoBarras,
            UpdateProductoRequest request)
        {
            var producto = new Producto
            {
                Nombre = request.Nombre,
                Descripcion = request.Descripcion,
                FechaVencimiento = request.FechaVencimiento,
                EstadoProducto = request.EstadoProducto
            };

            var actualizado = await _producto
                .UpdateProducto(codigoBarras, producto);

            if (actualizado is null)
            {
                throw new Exception("Producto no encontrado.");
            }

            return new ProductoDTO
            {
                Nombre = actualizado.Nombre,
                Categoria = actualizado.Categoria?.Nombre ?? ""
            };
        }
        public async Task<StockProductoDTO> GetStock(string codigoBarras)
        {
            var stock = await _producto.GetStockDisponibleAsync(codigoBarras);

            return new StockProductoDTO(codigoBarras, stock);
        }

        public async Task<List<StockProductoDTO>> GetInventario()
        {
            var inventarioDomain = await _producto.GetInventarioAsync();
            return inventarioDomain.Select(i => new StockProductoDTO(i.CodigoBarras, i.StockDisponible, i.NombreProducto)).ToList();
        }
    }
}