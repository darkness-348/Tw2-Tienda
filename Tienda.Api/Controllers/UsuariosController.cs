using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tienda.Application.DTOs;
using Tienda.Application.Interfaces;
using Tienda.Application.Services;
using Tienda.Domain.Interfaces;

namespace Tienda.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsuariosController : ControllerBase
    {
        private readonly GerenteUseCase _gerente;

        public UsuariosController(GerenteUseCase gerente)
        {
            _gerente = gerente;
        }
        [HttpGet("Usuarios-con-roles")]
        [Authorize(Roles ="Gerente")] 
        public async Task<IActionResult> GetAllUsers()
        {
            var usuarios = await _gerente.ListarUsuarios() ;
            return Ok(usuarios);
        }

    }
}
