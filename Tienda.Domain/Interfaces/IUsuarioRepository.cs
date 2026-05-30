using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Domain.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> GetByEmailAsync(string email);
        Task<Usuario> AddAsync(Usuario usuario);


        Task<List<Usuario>> ListarUsuariosPersonas();
        
        Task<Usuario?> AsignarRol(string correo,Rol rol,Rol nuevoRol);

        Task<Usuario> EliminarUsuario(string nombre, string email);
        Task<Usuario> ObtenerIdSegunJWT(int id);

        Task<Persona> ObtenerPersonaId(int id);
    }
}
