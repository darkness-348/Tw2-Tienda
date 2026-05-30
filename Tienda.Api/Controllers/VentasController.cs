using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tienda.Application.Dtos;
using Tienda.Application.Services;

namespace Tienda.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VentasController:ControllerBase
    {
        private readonly VentaService _venta;
        public VentasController(VentaService venta)
        {
            _venta = venta;
        }
        [HttpGet]
        [Authorize(Roles ="Gerente")]
        public async Task<IActionResult> GetAllVentas()
        {
            return Ok(await _venta.ListarVentaRegistrada());
        }
        [HttpGet("{idVenta}")]
        [Authorize(Roles ="Gerente")]
        public async Task<IActionResult> GetIdVentas(int idVenta)
        {
            var venta = await _venta.MostrarVentaRegistrada(idVenta);
            if (venta is null) return NotFound();
            return Ok(venta);
        }
        [HttpPost("Crear-Venta")]
        [Authorize(Roles ="Cajero")]
        public async Task<IActionResult> PostVenta([FromBody] PostVentaDTO postVentaDTO)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(userId, out int user))
            {
                var doing = await _venta.RegistrarVenta(postVentaDTO.Venta, user, postVentaDTO.Detalle, postVentaDTO.MetodoPago);
                if (doing is not null) return StatusCode(201, new { mensaje = "Creado existosamente",Venta=doing });
                return BadRequest();
            }
            else return BadRequest();

        }
    }
}
