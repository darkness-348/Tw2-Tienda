using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tienda.Application.Dtos;
using Tienda.Application.Interfaces;

namespace Tienda.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Gerente")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("listar-Categorias")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        [HttpPost("Crear-Categoria")]
        public async Task<IActionResult> AddCategory([FromBody] CategoryDTO dto)
        {
            try
            {
                var category = await _categoryService.AddCategoryAsync(dto);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }



        [HttpPut("{currentName}")]
        public async Task<IActionResult> UpdateCategory(string currentName, [FromBody] CategoryDTO dto)
        {
            try
            {
                var category = await _categoryService.UpdateCategoryAsync(currentName, dto.Name);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return NotFound(new { mensaje = ex.Message });
            }



        }
        [HttpDelete("{categoryName}")]
        public async Task<IActionResult> DeleteCategory(string categoryName)
        {
            try
            {
                var category = await _categoryService.DelateCategoryAsync(categoryName);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return NotFound(new { mensaje = ex.Message });
            }
        }
    }
}
