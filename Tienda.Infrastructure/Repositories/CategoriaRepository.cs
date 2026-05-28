using System;
using System.Collections.Generic;
using System.IO.Pipes;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class CategoriaRepository :ICategoriaRepository
    {
        private readonly TiendaDBContext _context;
        public CategoriaRepository(TiendaDBContext context)
        {
            _context=context;
        }

        public async Task<Categoria> AddCategoria(Categoria categoria)
        {
            await _context.Categorias.AddAsync(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<Categoria?> GetByCategoriaNombre(string categoriNombre)
        {
            return await _context.Categorias.FirstOrDefaultAsync(p =>p.Nombre==categoriNombre);
        }
    }
}