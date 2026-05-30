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
    public class VentaService : IVentaService
    {
        private readonly IVentaRepository _venta;
        private readonly IUsuarioRepository _usuario;
        private readonly IProductoRepository _producto;
        private readonly IDetalleVentaRepository _detalleVenta;
        private readonly IMetodoPagoRepository _metodoPago;
        private readonly IMetodoPagoVentaRepository _metodoPagoVenta;
        private readonly ITransactionManager _transactionManager;

        public VentaService(
            IVentaRepository venta,
            IUsuarioRepository usuario,
            IProductoRepository producto,
            IDetalleVentaRepository detalleVenta,
            IMetodoPagoRepository metodoPago,
            IMetodoPagoVentaRepository metodoPagoVenta,
            ITransactionManager transactionManager)
        {
            _venta = venta;
            _usuario = usuario;
            _producto = producto;
            _detalleVenta = detalleVenta;
            _metodoPago = metodoPago;
            _metodoPagoVenta = metodoPagoVenta;
            _transactionManager = transactionManager;
        }

        public async Task<List<IdVentaDTO>> ListarVentaRegistrada()
        {
            var ventas = await _venta.GetAllVentas();
            return ventas.Select(v => new IdVentaDTO
            {
                IdVenta = v.Id,
                Total = v.Total,
                Estado = v.EstadoVenta,
                Descripcion = v.Descripcion
            }).ToList();
        }

        public async Task<IdVentaDTO?> MostrarVentaRegistrada(int idVenta)
        {
            var venta = await _venta.GetVentaById(idVenta);
            if (venta is null)
            {
                return null;
            }
            return new IdVentaDTO
            {
                IdVenta = idVenta,
                Total = venta.Total,
                Estado = venta.EstadoVenta,
                Descripcion = venta.Descripcion
            };
        }

        public async Task<ViewVentaDTO?> RegistrarVenta(VentaDTO ventaDto, int idUser, List<DetalleVentaDTO> detalleVentaDTOs, MetodoPagoVentaDTO metodoPagoVentaDTO)
        {
            if (ventaDto is null || detalleVentaDTOs.Count == 0)
            {
                return null;
            }

            using (var transaction = await _transactionManager.BeginTransactionAsync())
            {
                try
                {
                    Usuario user = await _usuario.ObtenerIdSegunJWT(idUser);
                    if (user is null)
                    {
                        await transaction.RollbackAsync();
                        return null;
                    }

                    var productosRequeridos = detalleVentaDTOs.Select(d => d.NombreProducto).ToList();
                    var productos = await _producto.ObtenerPorNombres(productosRequeridos);

                    if (productos.Count != detalleVentaDTOs.Count)
                    {
                        await transaction.RollbackAsync();
                        return null;
                    }

                    MetodoPago metodo = await _metodoPago.ObtenerMetodoPago(metodoPagoVentaDTO.Nombre);
                    if (metodo is null)
                    {
                        await transaction.RollbackAsync();
                        return null;
                    }

                    Venta venta = new Venta
                    {
                        UsuarioId = user.Id,
                        Descripcion = ventaDto.Descripcion,
                        EstadoVenta = ventaDto.Estado,
                        Total = ventaDto.Total,
                        FechaVenta = DateTime.UtcNow,
                        Usuario = user
                    };

                    int idVenta = await _venta.RegistrarVenta(venta);

                    foreach (var item in detalleVentaDTOs)
                    {
                        Producto pr = productos.FirstOrDefault(p => p.Nombre == item.NombreProducto);

                        if (pr is null)
                        {
                            await transaction.RollbackAsync();
                            return null;
                        }

                        DetalleVenta dv = new DetalleVenta
                        {
                            VentaId = idVenta,
                            Venta = venta,
                            Cantidad = item.Cantidad,
                            Precio = item.Precio,
                            Producto = pr,
                            ProductoId = pr.Id
                        };
                        await _detalleVenta.RegistrarDetalleVenta(dv);
                    }

                    MetodoPagoVenta metodoPagoVenta = new MetodoPagoVenta
                    {
                        VentaId = idVenta,
                        Monto = metodoPagoVentaDTO.Monto,
                        MetodoPago = metodo,
                        MetodoPagoId = metodo.Id,
                        FechaPago = metodoPagoVentaDTO.FechaPago,
                        Venta = venta
                    };
                    var resultadoPago = await _metodoPagoVenta.SaveMetodoPagoVenta(metodoPagoVenta);

                    if (!resultadoPago)
                    {
                        await transaction.RollbackAsync();
                        return null;
                    }

                    ViewVentaDTO viewVentaDTO = new ViewVentaDTO
                    {
                        Venta = new GetVentaDTO
                        {
                            Total = venta.Total,
                            FechaCompra = venta.FechaVenta
                        },
                        MetodoPago = new GetMetodoPagoVentaDTO
                        {
                            Nombre = metodo.Nombre
                        },
                        Detalle = detalleVentaDTOs
                    };

                    await transaction.CommitAsync();
                    return viewVentaDTO;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<List<ReporteVentaDiaDTO>> GetVentasDelDiaAsync(DateTime fecha)
        {
            var ventas = await _venta.GetVentasDiaAsync(fecha);
            return ventas.Select(v => new ReporteVentaDiaDTO
            {
                Id = v.Id,
                EmailUsuario = v.Usuario?.Email ?? string.Empty,
                NombreCliente = v.Persona != null ? $"{v.Persona.Nombre} {v.Persona.Apellido}" : "Cliente General",
                FechaVenta = v.FechaVenta,
                Total = v.Total,
                EstadoVenta = v.EstadoVenta.ToString(),
                Descripcion = v.Descripcion,
                MetodoPago = v.MetodosPagoVenta.FirstOrDefault()?.MetodoPago?.Nombre ?? "Sin Especificar",
                Detalles = v.DetallesVenta.Select(d => new DetalleVentaDTO
                {
                    NombreProducto = d.Producto?.Nombre ?? string.Empty,
                    Precio = d.Precio,
                    Cantidad = d.Cantidad,
                    Subtotal = d.Precio * d.Cantidad
                }).ToList()
            }).ToList();
        }
    }
}
