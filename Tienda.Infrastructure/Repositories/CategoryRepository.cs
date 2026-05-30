using System;
using System.Collections.Generic;
using System.IO.Pipes;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class CategoryRepository :ICategoryRepository
    {
        private readonly TiendaDBContext _context;
        public CategoryRepository(TiendaDBContext context)
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
            return await _context.Categorias.FirstOrDefaultAsync(p => p.Nombre == categoriNombre);
        }

        public async Task<List<Categoria>> GetAllCategorias()
        {
            return await _context.Categorias.ToListAsync();
        }

        public async Task<Categoria?> UpdateCategoria(string currentName, string newName)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.Nombre == currentName);
            if (categoria is null)
            {
                return null;
            }

            categoria.Nombre = newName;
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<Categoria?> DeleteCategoria(string categoryName)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.Nombre == categoryName);
            if (categoria is null)
            {
                return null;
            }

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }
    }
}