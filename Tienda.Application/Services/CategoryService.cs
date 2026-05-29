using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tienda.Application.Dtos;
using Tienda.Application.Interfaces;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoriaRepository _categoryRepository;
        public CategoryService(ICategoriaRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<List<CategoryDTO>> GetAllCategoriesAsync()
        {

            var categories = await _categoryRepository.GetAllCategorias();

            var categoriesDto = categories.Select(c => new CategoryDTO
            {
                Id = c.Id,
                Name = c.Nombre
            }).ToList();

            return categoriesDto;
        }



        public async Task<CategoryDTO> UpdateCategoryAsync(string currentName, string newName)
        {
            var category = await _categoryRepository.UpdateCategoria(currentName, newName);
            if (category is null)
            {
                throw new Exception($"La categoría '{currentName}' no existe.");
            }

            var categoryDto = new CategoryDTO
            {
                Id = category.Id,
                Name = category.Nombre
            };
            return categoryDto;
        }


        public async Task<CategoryDTO> DelateCategoryAsync(string categoryName)
        {
            var category = await _categoryRepository.DeleteCategoria(categoryName);
            if (category is null)
            {
                throw new Exception($"La categoría '{categoryName}' no existe.");
            }

            var categoryDto = new CategoryDTO
            {
                Id = category.Id,
                Name = category.Nombre
            };

            return categoryDto;
        }


        public async Task<CategoryDTO> AddCategoryAsync(CategoryDTO dto)
        {
            var categoriaExistente = await _categoryRepository.GetByCategoriaNombre(dto.Name);

            if (categoriaExistente != null)
            {
  
                throw new Exception($"La categoría '{dto.Name}' ya existe en la base de datos.");
            }
        
            var nuevaCategory = new Categoria
                {
                    Nombre = dto.Name
                };
                var category = await _categoryRepository.AddCategoria(nuevaCategory);
                var categoryDto = new CategoryDTO
                {
                    Id = category.Id,
                    Name = category.Nombre
                };
                return categoryDto;
        }
    }

}
