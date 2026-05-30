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
    [Authorize(Roles = "Cajero")]
    public class CajerosController : ControllerBase
    {
        private readonly IVentaService _ventaService;

        public CajerosController(IVentaService ventaService)
        {
            _ventaService = ventaService;
        }

        [HttpGet("ventas-dia")]
        public async Task<IActionResult> GetVentasDelDia()
        {
            try
            {
                var ventas = await _ventaService.GetVentasDelDiaAsync(DateTime.Today);
                return Ok(ventas);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
    }
}
