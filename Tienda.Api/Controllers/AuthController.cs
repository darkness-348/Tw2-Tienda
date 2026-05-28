using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Tienda.Application.DTOs;
using Tienda.Application.Interfaces;

namespace Tienda.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var response = await _authService.LoginAsync(request);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
              
                return Unauthorized(new { mensaje = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var mensaje = await _authService.RegisterAsync(request);
                return Ok(new { mensaje = mensaje });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
        //[HttpGet("perfil")]
        //[Authorize] // El middleware ya leyó y validó el token de la cabecera
        //public async Task<IActionResult> GetPerfil()
        //{
        //    // El token ya fue procesado, solo extraes el dato que necesitas
        //    //var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        //    //if (userId is null) return BadRequest();
        //    //return Ok(new { userID=userId});
        //    // Usas ese ID para recuperar datos con EF Core
        //    //var datos = await _venta.ObtenerIdUser(userId);

        //    //return Ok(datos);
        //    // DEBUG: Muestra todos los claims
        //    //var allClaims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();

        //    //var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

        //    //return Ok(new
        //    //{
        //    //    userId = userId,
        //    //    allClaims = allClaims,
        //    //    userIdentity = User.Identity?.Name,
        //    //    authenticationType = User.Identity?.AuthenticationType
        //    //});
        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    return Ok(userId);
        //}
    }
}
