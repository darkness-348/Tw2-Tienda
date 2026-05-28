using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class PersonaRepository:IPersonaRepository
    {
        private readonly TiendaDBContext _context;
        public PersonaRepository(TiendaDBContext context)
        {
            _context = context;
        }
        public async Task<Persona?> GetByCiAsync(string ci)
        {
            return await _context.Set<Persona>().FirstOrDefaultAsync(p => p.Ci == ci);
        }
        public async Task<Persona> AddAsync(Persona persona)
        {
            await _context.Personas.AddAsync(persona);
            await _context.SaveChangesAsync();
            return persona;
        }
    }
}
