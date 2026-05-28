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
        
        Task<Usuario> AsignarRol(int idUsuario);
        Task QuitarRol(int idUsuario);
        Task<Usuario> EditarRol(int idUsuario);
    }
}
