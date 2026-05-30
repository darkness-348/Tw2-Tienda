using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Tienda.Domain.Entitys;

namespace Tienda.Infrastructure
{
    public class TiendaDBContext : DbContext
    {
        public TiendaDBContext(DbContextOptions<TiendaDBContext> options) : base(options)
        {
        }
        public DbSet<Persona> Personas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<MovimientoStock> MovimientoStocks { get; set; }
        public DbSet<Proveedor> Proveedores { get; set; }
        public DbSet<ProductoProveedor> ProductosProveedores { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<DetalleVenta> DetalleVentas { get; set; }
        public DbSet<MetodoPago> MetodoPagos { get; set; }
        public DbSet<MetodoPagoVenta> MetodoPagoVentas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relación Persona - Usuario (1 a 1 compartiendo Id)
            modelBuilder.Entity<Usuario>()
                .HasOne(u => u.Persona)
                .WithOne(p => p.Usuario)
                .HasForeignKey<Usuario>(u => u.Id);

            // Relación Categoria - Producto
            modelBuilder.Entity<Producto>()
                .HasOne(p => p.Categoria)
                .WithMany(c => c.Productos)
                .HasForeignKey(p => p.CategoriaId);

            // Relación Producto - MovimientoStock
            modelBuilder.Entity<MovimientoStock>()
                .HasOne(m => m.Producto)
                .WithMany(p => p.MovimientosStock)
                .HasForeignKey(m => m.ProductoId);

            // Relación Usuario - MovimientoStock
            modelBuilder.Entity<MovimientoStock>()
                .HasOne(m => m.Usuario)
                .WithMany(u => u.MovimientosStock)
                .HasForeignKey(m => m.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relación Proveedor - ProductoProveedor
            modelBuilder.Entity<ProductoProveedor>()
                .HasOne(pp => pp.Proveedor)
                .WithMany(p => p.ProductosProveedor)
                .HasForeignKey(pp => pp.ProveedorId);

            // Relación Producto - ProductoProveedor
            modelBuilder.Entity<ProductoProveedor>()
                .HasOne(pp => pp.Producto)
                .WithMany(p => p.ProductosProveedores)
                .HasForeignKey(pp => pp.ProductoId);

            // Relación Usuario - Venta
            modelBuilder.Entity<Venta>()
                .HasOne(v => v.Usuario)
                .WithMany(u => u.Ventas)
                .HasForeignKey(v => v.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relación Persona - Venta (Venta al fiado, PersonaId es NULL)
            modelBuilder.Entity<Venta>()
                .HasOne(v => v.Persona)
                .WithMany(p => p.Ventas)
                .HasForeignKey(v => v.PersonaId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);

            // Relación Venta - DetalleVenta
            modelBuilder.Entity<DetalleVenta>()
                .HasOne(d => d.Venta)
                .WithMany(v => v.DetallesVenta)
                .HasForeignKey(d => d.VentaId);

            // Relación Producto - DetalleVenta
            modelBuilder.Entity<DetalleVenta>()
                .HasOne(d => d.Producto)
                .WithMany(p => p.DetallesVenta)
                .HasForeignKey(d => d.ProductoId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relación MetodoPago - MetodoPagoVenta
            modelBuilder.Entity<MetodoPagoVenta>()
                .HasOne(mpv => mpv.MetodoPago)
                .WithMany(mp => mp.MetodosPagoVenta)
                .HasForeignKey(mpv => mpv.MetodoPagoId);

            // Relación Venta - MetodoPagoVenta
            modelBuilder.Entity<MetodoPagoVenta>()
                .HasOne(mpv => mpv.Venta)
                .WithMany(v => v.MetodosPagoVenta)
                .HasForeignKey(mpv => mpv.VentaId);
        }
    }
}
