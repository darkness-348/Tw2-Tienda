using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tienda.Application.Dtos;
using Tienda.Application.Interfaces;

namespace Tienda.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Gerente")]
    public class ProveedoresController : ControllerBase
    {
        private readonly IProveedorService _proveedorService;

        public ProveedoresController(IProveedorService proveedorService)
        {
            _proveedorService = proveedorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var proveedores = await _proveedorService.GetAllProveedoresAsync();
                return Ok(proveedores);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("{codigoProveedor}")]
        public async Task<IActionResult> GetByCodigo(string codigoProveedor)
        {
            try
            {
                var proveedor = await _proveedorService.GetByCodigoProveedorAsync(codigoProveedor);
                if (proveedor == null)
                {
                    return NotFound(new { mensaje = $"El proveedor '{codigoProveedor}' no fue encontrado." });
                }
                return Ok(proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CrearProveedorRequest request)
        {
            try
            {
                var proveedor = await _proveedorService.AddProveedorAsync(request);
                return CreatedAtAction(nameof(GetByCodigo), new { codigoProveedor = proveedor.CodigoProveedor }, proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpPut("{codigoProveedor}")]
        public async Task<IActionResult> Update(string codigoProveedor, [FromBody] UpdateProveedorRequest request)
        {
            try
            {
                var proveedor = await _proveedorService.UpdateProveedorAsync(codigoProveedor, request);
                if (proveedor == null)
                {
                    return NotFound(new { mensaje = $"El proveedor '{codigoProveedor}' no fue encontrado." });
                }
                return Ok(proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpDelete("{codigoProveedor}")]
        public async Task<IActionResult> Delete(string codigoProveedor)
        {
            try
            {
                var proveedor = await _proveedorService.DeleteProveedorAsync(codigoProveedor);
                if (proveedor == null)
                {
                    return NotFound(new { mensaje = $"El proveedor '{codigoProveedor}' no fue encontrado." });
                }
                return Ok(proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
    }
}
