using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Tienda.Application.Dtos;
using Tienda.Domain.Entitys;
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
        public async Task<UsuarioDTO> AsignarRol(string email,Rol rol,Rol nuevoRol)
        {
            var user = await _usuario.AsignarRol(email,rol,nuevoRol);
            if (user is null) throw new Exception("No existe ese usuario");
            return new UsuarioDTO
            {
                Nombre=user.Persona.Nombre,
                Email=user.Email,
                Rol = rol,
                Estado=user.Estado
            };
        }
        public async Task<object?> EliminarUsuario(string nombre,string email)
        {
            var user = await _usuario.EliminarUsuario(nombre, email);
            if (user is null) return null;
            return user;
        }
    }
}
