using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Application.Dtos;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Application.Services
{
    public class MovimientoStockUseCase
    {
        private readonly IMovimientoStockRepository _movimientoRepository;
        private readonly IProductoRepository _productoRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IProveedorRepository _proveedorRepository;

        public MovimientoStockUseCase(IMovimientoStockRepository movimientoRepository,
            IProductoRepository productoRepository,
            IUsuarioRepository usuarioRepository,
            IProveedorRepository proveedorRepository)
        {
            _movimientoRepository = movimientoRepository;
            _productoRepository = productoRepository;
            _usuarioRepository = usuarioRepository;
            _proveedorRepository = proveedorRepository;
        }

        public async Task<MovimientoStockDTO> AddMovimiento(CrearMovimientoStockRequest request, string correoUsuario)
        {
            var producto = await _productoRepository.GetByCodigoBarrasAsync(request.CodigoBarras);
            if (producto is null) throw new Exception("El producto no existe.");

            var usuario = await _usuarioRepository.GetByEmailAsync(correoUsuario);
            if (usuario is null) throw new Exception("El usuario no existe.");

            // Si ya existe un movimiento para este usuario y producto, incrementar la cantidad
            var actualizado = await _movimientoRepository.UpdateMovimientoCantidadAsync(usuario.Id, producto.Id, request.Cantidad);
            if (actualizado is not null)
            {
                return new MovimientoStockDTO
                {
                    NombreProducto = actualizado.Producto?.Nombre ?? producto.Nombre,
                    CorreoUsuario = actualizado.Usuario?.Email ?? usuario.Email,
                    Estado = actualizado.EstadoMovimientoStock.ToString()
                };
            }

            var movimiento = new MovimientoStock
            {
                ProductoId = producto.Id,
                UsuarioId = usuario.Id,
                Cantidad = request.Cantidad,
                FechaEntrega = request.FechaEntrega,
                Descripcion = request.Descripcion,
                EstadoMovimientoStock = EstadoMovimientoStock.Pendiente,
                Total = request.Total,
                Unidades = request.Unidades,
                TipoMovimiento = request.TipoMovimiento
            };

            var creado = await _movimientoRepository.AddMovimientoAsync(movimiento);

            return new MovimientoStockDTO
            {
                NombreProducto = producto.Nombre,
                CorreoUsuario = usuario.Email,
                Estado = creado.EstadoMovimientoStock.ToString()
            };
        }

        public async Task<List<MovimientoStockDTO>> GetAllPendientes()
        {
            var movimientos = await _movimientoRepository.GetAllPendienteAsync();
            return movimientos.Select(m => new MovimientoStockDTO
            {
                NombreProducto = m.Producto?.Nombre ?? string.Empty,
                CorreoUsuario = m.Usuario?.Email ?? string.Empty,
                Estado = m.EstadoMovimientoStock.ToString()
            }).ToList();
        }

        public async Task<List<MovimientoStockDTO>> GetAllCompletados()
        {
            var movimientos = await _movimientoRepository.GetAllCompletadoAsync();
            return movimientos.Select(m => new MovimientoStockDTO
            {
                NombreProducto = m.Producto?.Nombre ?? string.Empty,
                CorreoUsuario = m.Usuario?.Email ?? string.Empty,
                Estado = m.EstadoMovimientoStock.ToString()
            }).ToList();
        }

        public async Task<MovimientoStockDTO> UpdateMovimiento(string codigoBarras, string correoUsuario, string estado)
        {
            var movimiento = await _movimientoRepository.UpdateMovimientoAsync(codigoBarras, correoUsuario, estado);
            if (movimiento is null) throw new Exception("Movimiento no encontrado.");

            return new MovimientoStockDTO
            {
                NombreProducto = movimiento.Producto?.Nombre ?? string.Empty,
                CorreoUsuario = movimiento.Usuario?.Email ?? string.Empty,
                Estado = movimiento.EstadoMovimientoStock.ToString()
            };
        }

        public async Task<List<ProveedorDTO>> GetProveedoresActivos()
        {
            var proveedores = await _proveedorRepository.AllProveedorAsync();
            return proveedores.Select(p => new ProveedorDTO
            {
                Id = p.Id,
                Nombre = p.Nombre,
                CodigoProveedor = p.CodigoProveedor,
                Telefono = p.Telefono,
                Direccion = p.Direccion
            }).ToList();
        }
    }
}