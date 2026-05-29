using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Application.Dtos;

namespace Tienda.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDTO>> GetAllCategoriesAsync();
        Task<CategoryDTO> UpdateCategoryAsync(string currentName,string newName);
        Task<CategoryDTO> DelateCategoryAsync(string nombre);
        Task<CategoryDTO> AddCategoryAsync(CategoryDTO dto);
    }
}
