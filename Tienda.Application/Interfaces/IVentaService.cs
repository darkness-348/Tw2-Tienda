using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tienda.Application.Dtos;

namespace Tienda.Application.Interfaces
{
    public interface IVentaService
    {
        Task<List<IdVentaDTO>> ListarVentaRegistrada();
        Task<IdVentaDTO?> MostrarVentaRegistrada(int idVenta);
        Task<ViewVentaDTO?> RegistrarVenta(VentaDTO ventaDto, int idUser, List<DetalleVentaDTO> detalleVentaDTOs, MetodoPagoVentaDTO metodoPagoVentaDTO);
        Task<List<ReporteVentaDiaDTO>> GetVentasDelDiaAsync(DateTime fecha);
    }
}
