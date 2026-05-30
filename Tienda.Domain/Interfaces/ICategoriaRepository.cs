using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Domain.Entitys;

namespace Tienda.Domain.Interfaces
{
    public interface ICategoriaRepository
    {
        Task<Categoria?> GetByCategoriaNombre(string categoriNombre);
        Task<Categoria> AddCategoria(Categoria categoria);
        Task<List<Categoria>> GetAllCategorias();
        Task<Categoria?> UpdateCategoria(string currentName, string newName);
        Task<Categoria?> DeleteCategoria(string categoryName);
    }
}