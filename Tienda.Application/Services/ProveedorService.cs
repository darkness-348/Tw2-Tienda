using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Application.Dtos;
using Tienda.Application.Interfaces;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Application.Services
{
    public class ProveedorService : IProveedorService
    {
        private readonly IProveedorRepository _proveedorRepository;

        public ProveedorService(IProveedorRepository proveedorRepository)
        {
            _proveedorRepository = proveedorRepository;
        }

        public async Task<List<ProveedorDTO>> GetAllProveedoresAsync()
        {
            var proveedores = await _proveedorRepository.AllProveedorAsync();
            return proveedores.Select(p => new ProveedorDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Direccion = p.Direccion,
                Telefono = p.Telefono,
                Relacion = p.Relacion,
                Estado = p.EstadoProveedor,
                CodigoProveedor = p.CodigoProveedor
            }).ToList();
        }

        public async Task<ProveedorDTO?> GetByCodigoProveedorAsync(string codigoProveedor)
        {
            var p = await _proveedorRepository.GetByCodigoProveedorAsync(codigoProveedor);
            if (p == null)
            {
                return null;
            }

            return new ProveedorDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Direccion = p.Direccion,
                Telefono = p.Telefono,
                Relacion = p.Relacion,
                Estado = p.EstadoProveedor,
                CodigoProveedor = p.CodigoProveedor
            };
        }

        public async Task<ProveedorDTO> AddProveedorAsync(CrearProveedorRequest request)
        {
            var existente = await _proveedorRepository.GetByCodigoProveedorAsync(request.CodigoProveedor);
            if (existente != null)
            {
                throw new Exception($"Ya existe un proveedor con el código '{request.CodigoProveedor}'.");
            }

            var nuevo = new Proveedor
            {
                Nombre = request.Nombre,
                Direccion = request.Direccion,
                Telefono = request.Telefono,
                Relacion = request.Relacion,
                EstadoProveedor = EstadoProveedor.Activo,
                CodigoProveedor = request.CodigoProveedor
            };

            var p = await _proveedorRepository.AddProveedor(nuevo);
            return new ProveedorDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Direccion = p.Direccion,
                Telefono = p.Telefono,
                Relacion = p.Relacion,
                Estado = p.EstadoProveedor,
                CodigoProveedor = p.CodigoProveedor
            };
        }

        public async Task<ProveedorDTO?> UpdateProveedorAsync(string codigoProveedor, UpdateProveedorRequest request)
        {
            var existente = await _proveedorRepository.GetByCodigoProveedorAsync(codigoProveedor);
            if (existente == null)
            {
                throw new Exception($"El proveedor con código '{codigoProveedor}' no existe.");
            }

            var paraActualizar = new Proveedor
            {
                Nombre = request.Nombre,
                Direccion = request.Direccion,
                Telefono = request.Telefono,
                Relacion = request.Relacion,
                EstadoProveedor = request.Estado
            };

            var p = await _proveedorRepository.UpdateProveedor(codigoProveedor, paraActualizar);
            if (p == null)
            {
                return null;
            }

            return new ProveedorDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Direccion = p.Direccion,
                Telefono = p.Telefono,
                Relacion = p.Relacion,
                Estado = p.EstadoProveedor,
                CodigoProveedor = p.CodigoProveedor
            };
        }

        public async Task<ProveedorDTO?> DeleteProveedorAsync(string codigoProveedor)
        {
            var existente = await _proveedorRepository.GetByCodigoProveedorAsync(codigoProveedor);
            if (existente == null)
            {
                throw new Exception($"El proveedor con código '{codigoProveedor}' no existe.");
            }

            var p = await _proveedorRepository.DeleteProveedor(codigoProveedor);
            if (p == null)
            {
                return null;
            }

            return new ProveedorDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Direccion = p.Direccion,
                Telefono = p.Telefono,
                Relacion = p.Relacion,
                Estado = p.EstadoProveedor,
                CodigoProveedor = p.CodigoProveedor
            };
        }
    }
}
