using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class UsuarioRepository:IUsuarioRepository
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

    }
}
