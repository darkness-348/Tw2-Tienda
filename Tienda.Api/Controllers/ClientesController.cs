using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tienda.Application.Dtos;
using Tienda.Application.Interfaces;

namespace Tienda.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Cliente")]
    public class ClientesController : ControllerBase
    {
        private readonly IProductoService _productoService;

        public ClientesController(IProductoService productoService)
        {
            _productoService = productoService;
        }

        [HttpGet("productos")]
        public async Task<IActionResult> GetProductos()
        {
            try
            {
                var productos = await _productoService.GetProductosDisponiblesAsync();
                return Ok(productos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("productos/filtrar")]
        public async Task<IActionResult> FiltrarProductos([FromQuery] string? nombre, [FromQuery] string? categoria)
        {
            try
            {
                var productos = await _productoService.FiltrarProductosAsync(nombre, categoria);
                return Ok(productos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
    }
}
