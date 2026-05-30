using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Interfaces
{
    public interface IMovimientoStockRepository
    {
        Task<MovimientoStock> AddMovimientoAsync(MovimientoStock movimiento);
        Task<List<MovimientoStock>> GetAllPendienteAsync();
        Task<List<MovimientoStock>> GetAllCompletadoAsync();
        Task<MovimientoStock> UpdateMovimientoAsync(string CodigoBarras, string CorreoUsuario,string estado);
        Task<MovimientoStock> UpdateMovimientoCantidadAsync(int usuarioId, int productoId, int cantidadAgregar);
    }
}