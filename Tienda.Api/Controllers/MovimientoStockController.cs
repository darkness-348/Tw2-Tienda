using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Tienda.Application.Dtos;
using Tienda.Application.Services;

namespace Tienda.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MovimientoStockController : ControllerBase
    {
        private readonly MovimientoStockUseCase _movimiento;
        public MovimientoStockController(MovimientoStockUseCase movimiento)
        {
            _movimiento = movimiento;
        }

        [HttpPost("Crear-Movimiento")]
        [Authorize(Roles = "EncargadoAlmacen")]
        public async Task<IActionResult> CrearMovimiento([FromBody] CrearMovimientoStockRequest request)
        {
            try
            {
                var correo = User.FindFirstValue(JwtRegisteredClaimNames.Email) ?? User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(correo)) return BadRequest(new { mensaje = "No se encontró el email en el token." });

                var resultado = await _movimiento.AddMovimiento(request, correo);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("Proveedores")]
        [Authorize(Roles = "EncargadoAlmacen")]
        public async Task<IActionResult> GetProveedores()
        {
            try
            {
                var proveedores = await _movimiento.GetProveedoresActivos();
                return Ok(proveedores);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("Pendientes")]
        [Authorize(Roles = "EncargadoAlmacen")]
        public async Task<IActionResult> GetPendientes()
        {
            try
            {
                var lista = await _movimiento.GetAllPendientes();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("Completados")]
        [Authorize(Roles = "EncargadoAlmacen")]
        public async Task<IActionResult> GetCompletados()
        {
            try
            {
                var lista = await _movimiento.GetAllCompletados();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpPatch("Actualizar-Movimiento")]
        [Authorize(Roles = "EncargadoAlmacen")]
        public async Task<IActionResult> ActualizarMovimiento([FromBody] UpdateMovimientoStock request)
        {
            try
            {
                var actualizado = await _movimiento.UpdateMovimiento(request.CodigoBarras, request.CorreoUsuario, request.Estado);
                return Ok(actualizado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
    }
}
