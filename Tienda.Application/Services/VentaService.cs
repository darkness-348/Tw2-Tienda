using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tienda.Application.Dtos;
using Tienda.Application.Interfaces;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Application.Services
{
    public class VentaService
    {
        private readonly IVentaRepository _venta;
        private readonly IUsuarioRepository _usuario;
        private readonly IProductoRepository _producto;
        private readonly IDetalleVentaRepository _detalleVenta;
        private readonly IMetodoPagoRepository _metodoPago;
        private readonly IMetodoPagoVentaRepository _metodoPagoVenta;
        private readonly ITransactionManager _transactionManager; // ← NUEVO

        public VentaService(
            IVentaRepository venta,
            IUsuarioRepository usuario,
            IProductoRepository producto,
            IDetalleVentaRepository detalleVenta,
            IMetodoPagoRepository metodoPago,
            IMetodoPagoVentaRepository metodoPagoVenta,
            ITransactionManager transactionManager) // ← NUEVO
        {
            _venta = venta;
            _usuario = usuario;
            _producto = producto;
            _detalleVenta = detalleVenta;
            _metodoPago = metodoPago;
            _metodoPagoVenta = metodoPagoVenta;
            _transactionManager = transactionManager; // ← NUEVO
        }
        //solo deberia mostrar el encabezado y si quiere mostrar el detalle seria hacer otra clase de servicios para este, lo mismo para el endpoint
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
            if (venta is null) return null;
            return new IdVentaDTO
            {
                IdVenta = idVenta,
                Total=venta.Total,
                Estado=venta.EstadoVenta,
                Descripcion=venta.Descripcion,
            };
        }
        public async Task<ViewVentaDTO?> RegistrarVenta(VentaDTO ventaDto,int idUser,List<DetalleVentaDTO> detalleVentaDTOs, MetodoPagoVentaDTO metodoPagoVentaDTO)
        {
            if (ventaDto is null || detalleVentaDTOs.Count == 0) return null;

            // ✅ TRANSACCIÓN
            using (var transaction = await _transactionManager.BeginTransactionAsync())
            {
                try
                {
                    // 1️⃣ Validar usuario
                    Usuario user = await _usuario.ObtenerIdSegunJWT(idUser);
                    if (user is null)
                    {
                        await transaction.RollbackAsync();
                        return null;
                    }

                    // 2️⃣ Obtener productos
                    var productosRequeridos = detalleVentaDTOs.Select(d => d.NombreProducto).ToList();
                    var productos = await _producto.ObtenerPorNombres(productosRequeridos);

                    if (productos.Count != detalleVentaDTOs.Count)
                    {
                        await transaction.RollbackAsync();
                        return null;
                    }

                    // 3️⃣ Validar método de pago
                    MetodoPago metodo = await _metodoPago.ObtenerMetodoPago(metodoPagoVentaDTO.Nombre);
                    if (metodo is null)
                    {
                        await transaction.RollbackAsync();
                        return null;
                    }

                    // 4️⃣ Crear venta
                    Venta venta = new Venta
                    {
                        UsuarioId = user.Id,
                        Descripcion = ventaDto.Descripcion,
                        EstadoVenta = ventaDto.Estado,
                        Total = ventaDto.Total,
                        FechaVenta = DateTime.UtcNow,
                        Usuario = user,
                    };

                    int idVenta = await _venta.RegistrarVenta(venta);

                    // 5️⃣ Registrar detalles de venta
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
                        await _detalleVenta.RegistrarDetalleVenta(dv); // ✅ Con await
                    }

                    // 6️⃣ Registrar método de pago
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
                            Nombre= metodo.Nombre
                        },
                        Detalle=detalleVentaDTOs
                    };
                    // ✅ TODO BIEN - CONFIRMAR TRANSACCIÓN
                    await transaction.CommitAsync();
                    return viewVentaDTO;
                }
                catch (Exception ex)
                {
                    // ❌ ERROR - DESHACER TODO
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
     
    }
}
