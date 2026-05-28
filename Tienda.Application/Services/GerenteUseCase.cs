using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Application.Dtos;
using Tienda.Domain.Interfaces;

namespace Tienda.Application.Services
{
    public class GerenteUseCase
    {
        private readonly IUsuarioRepository _usuario;
        public GerenteUseCase(IUsuarioRepository gerente)
        {
            _usuario= gerente;
        }

        public async Task<List<UsuarioDTO>> ListarUsuarios()
        {
            var usuarios = await _usuario.ListarUsuariosPersonas();


            return usuarios.Select(u => new UsuarioDTO 
            {
                Nombre=u.Persona.Nombre,
                Email=u.Email,
                Rol=u.Rol,
                Estado=u.Estado
            }).ToList();


        }
    }
}
