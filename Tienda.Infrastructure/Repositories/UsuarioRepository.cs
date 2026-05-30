using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly TiendaDBContext _context;

        public UsuarioRepository(TiendaDBContext context)
        {
            _context = context;
        }
        public async Task<Usuario?> GetByEmailAsync(string email)
        {
            return await _context.Set<Usuario>().FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        }

        public async Task<Usuario> AddAsync(Usuario usuario)
        {
      
            await _context.Usuarios.AddAsync(usuario);

            await _context.SaveChangesAsync();

            return usuario;
        }



      
        public async Task<List<Usuario>> ListarUsuariosPersonas()
        {
            
            return await _context.Usuarios.Include(u=>u.Persona).Where(u=>u.Rol != Rol.Cliente && u.Estado!=Estado.Inactivo).ToListAsync(); 
        }

        public async Task<Usuario?> AsignarRol( string email,Rol rol,Rol nuevoRol)
        {
            var user=await _context.Usuarios.FirstOrDefaultAsync(u=>u.Email==email && u.Rol==rol);

            if (user is null) return null;
            user.Rol = nuevoRol;
            await _context.SaveChangesAsync();
            return user;
        }
  
        public async Task<Usuario> EliminarUsuario(string nombre, string email)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Persona.Nombre == nombre && u.Email == email);
            if (user is null) return null;
            user.Estado = Estado.Inactivo;
            await _context.SaveChangesAsync();
            return user;

        } 


        public async Task<Usuario?> ObtenerIdSegunJWT(int idUsuario)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == idUsuario);
            if (user is null) return null;
            return user;
        }

        public async Task<Persona?> ObtenerPersonaId(int id)
        {
            var per = await _context.Personas.FirstOrDefaultAsync(p => p.Id == id);
            if (per is null) return null;
            return per;
        }
    }
}
