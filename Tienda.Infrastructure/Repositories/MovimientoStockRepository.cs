using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    public class MovimientoStockRepository : IMovimientoStockRepository
    {
        private readonly TiendaDBContext _context;
        public MovimientoStockRepository(TiendaDBContext context)
        {
            _context = context;
        }
        public async Task<MovimientoStock> AddMovimientoAsync(MovimientoStock movimiento)
        {
            await _context.MovimientoStocks.AddAsync(movimiento);
            await _context.SaveChangesAsync();
            return movimiento;
        }
        public async Task<List<MovimientoStock>> GetAllAsync()
        {
            return await _context.MovimientoStocks
                .Include(m => m.Producto)
                .Include(m => m.Usuario)
                .ToListAsync();
        }
        //esto es actulizar
        public async Task<List<MovimientoStock>> GetAllPendienteAsync()
        {
            return await _context.MovimientoStocks
                .Include(m => m.Producto)
                .Include(m => m.Usuario)
                .Where(m => m.EstadoMovimientoStock == EstadoMovimientoStock.Pendiente)
                .ToListAsync();
        }

        public async Task<List<MovimientoStock>> GetAllCompletadoAsync()
        {
            return await _context.MovimientoStocks
                .Include(m => m.Producto)
                .Include(m => m.Usuario)
                .Where(m => m.EstadoMovimientoStock == EstadoMovimientoStock.Completado)
                .ToListAsync();
        }

        public async Task<MovimientoStock> UpdateMovimientoAsync(string codigoBarras, string correousuario, string estado)
        {
            var nombreProducto = await _context.Productos.FirstOrDefaultAsync(p => p.CodigoBarras == codigoBarras);
            var CorreoUsuario = await _context.Usuarios.FirstOrDefaultAsync(p => p.Email == correousuario);
            if (nombreProducto is null)
            {
                return null;
            }
            if (CorreoUsuario is null)
            {
                return null;
            }
            var movimiento = await _context.MovimientoStocks.FirstOrDefaultAsync(
                p => p.UsuarioId == CorreoUsuario.Id
                && p.ProductoId == nombreProducto.Id);
            if (movimiento is null)
            {
                return null;
            }
            if (estado.ToLower() == "completado")
            {
                movimiento.EstadoMovimientoStock =
                    EstadoMovimientoStock.Completado;
            }

            if (estado.ToLower() == "pendiente")
            {
                movimiento.EstadoMovimientoStock =
                    EstadoMovimientoStock.Pendiente;
            }
            await _context.SaveChangesAsync();
            return movimiento;
        }

        public async Task<MovimientoStock> UpdateMovimientoCantidadAsync(
             int usuarioId,
             int productoId,
             int cantidadAgregar)
        {
            var movimiento = await _context.MovimientoStocks
                .Include(m => m.Producto)
                .Include(m => m.Usuario)
                .FirstOrDefaultAsync(
                    p => p.UsuarioId == usuarioId
                    && p.ProductoId == productoId);

            if (movimiento is null)
            {
                return null;
            }

            movimiento.Cantidad += cantidadAgregar;
            movimiento.FechaEntrega = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return movimiento;
        }
    }
}