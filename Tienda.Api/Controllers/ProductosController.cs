using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tienda.Application.Dtos;
using Tienda.Application.Services;
using Tienda.Domain.Entitys;
using Tienda.Infrastructure.Repositories;

namespace Tienda.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductosController : ControllerBase
    {
        private readonly ProductoUseCase _producto;
        public ProductosController(ProductoUseCase producto)
        {
            _producto = producto;
        }
        [HttpGet("Obtener-Productos")]
        public async Task<IActionResult> ObtenerProductos()
        {
            try
            {
                var productos = await _producto.GetAllProductos();
                return Ok(productos);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensaje = ex.Message
                });
            }
        }

        [HttpPost("Crear-Producto")]
        [Authorize(Roles = "EncargadoAlmacen")]
        public async Task<IActionResult> CrearProducto(CrearProductoRequest productoRequest)
        {

            try
            {
                var producto = await _producto.AddProducto(productoRequest);

                return Ok(producto);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensaje = ex.Message
                });
            }
        }

        [HttpDelete("Eliminar-Producto/{codigoBarras}")]
        [Authorize(Roles = "EncargadoAlmacen")]
        public async Task<IActionResult> EliminarProducto(string codigoBarras)
        {
            try
            {
                var producto = await _producto.DeleteProducto(codigoBarras);
                return Ok(producto);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensaje = ex.Message
                });
            }
        }

        [HttpPut("Actualizar-Producto/{codigoBarras}")]
        [Authorize(Roles = "EncargadoAlmacen")]
        public async Task<IActionResult> ActualizarProducto(
            string codigoBarras,
            UpdateProductoRequest request)
        {
            try
            {
                var producto = await _producto.UpdateProducto(codigoBarras, request);

                return Ok(producto);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensaje = ex.Message
                });
            }
        }
        [HttpGet("Stock/{codigoBarras}")]
        public async Task<IActionResult> GetStock(string codigoBarras)
        {
            try
            {
                var stock = await _producto.GetStock(codigoBarras);
                return Ok(stock);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensaje = ex.Message
                });
            }
        }

        [HttpGet("Inventario")]
        public async Task<IActionResult> GetInventario()
        {
            try
            {
                var inventario = await _producto.GetInventario();
                return Ok(inventario);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

    }
}