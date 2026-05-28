using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Tienda.Application.Dtos;
using Tienda.Application.DTOs;
using Tienda.Application.Interfaces;
using Tienda.Application.Services;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //lo de authorize tengo que revisarlo para que solo el gerente pueda acceder a estos endpoints
    [Authorize]
    public class UsuariosController : ControllerBase
    {
        private readonly GerenteUseCase _gerente;
        

        public UsuariosController(GerenteUseCase gerente)
        {
            _gerente = gerente;
          
        }
        [HttpGet("Usuarios-con-roles")]
        [Authorize(Roles = "Gerente")]
        public async Task<IActionResult> GetAllUsers()
        {
            var usuarios = await _gerente.ListarUsuarios() ;
            return Ok(usuarios);
        }
        [HttpPatch("Actualizar-Rol-Email")]
        [Authorize(Roles = "Gerente")]
        public async Task<IActionResult> PatchRol([FromBody] UsuarioPatch usuario)
        {
            var us = await _gerente.AsignarRol(usuario.Email, usuario.RolActual, usuario.RolNuevo);
            return Ok(us);
        }
        [HttpDelete("Eliminar-Usuario")]
        [Authorize(Roles = "Gerente")]
        public async Task<IActionResult> DeleteUser([FromBody] UsuarioDelete usuario)
        {
            var us = await _gerente.EliminarUsuario(usuario.Nombre, usuario.Email);
            if (us is null) return NotFound();
            return Ok(us);
        }
        [HttpGet("perfil")]
        [Authorize] // El middleware ya leyó y validó el token de la cabecera
        public async Task<IActionResult> GetPerfil()
        {
            // El token ya fue procesado, solo extraes el dato que necesitas
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(userId);
            // Usas ese ID para recuperar datos con EF Core
            //var datos = await _venta.ObtenerIdUser(userId);

            //return Ok(datos);
        }
    }
}
