using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Application.DTOs;
using Tienda.Application.Interfaces;
using Tienda.Domain.Entitys;
using Tienda.Domain.Interfaces;

namespace Tienda.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IJwtProvider _jwtProvider;
        private readonly IPasswordHasher _passwordHasher;


        public AuthService(IUsuarioRepository usuarioRepository, IJwtProvider jwtProvider,IPasswordHasher passwordHasher)
        {
            _usuarioRepository = usuarioRepository;
            _jwtProvider = jwtProvider;
            _passwordHasher = passwordHasher;
        }

        public async Task<LoginRespose> LoginAsync(LoginRequest request)
        {
            var usuario = await _usuarioRepository.GetByEmailAsync(request.Email);

            if (usuario == null)
            {
                throw new Exception("Credenciales incorrectos");
            }

            if (!_passwordHasher.Verify(request.Password, usuario.Password))
            {
                throw new Exception("Credenciales incorrectos");
            }

            if (usuario.Estado == Estado.Inactivo)
            {
                throw new Exception("Este usuario fue desactivado");
            }

            var token = _jwtProvider.GenerarToken(usuario);
            return new LoginRespose { Token = token, Rol = usuario.Rol.ToString() };
        }

        public async Task<string> RegisterAsync(RegisterRequest request)
        {
            var usuarioExistente = await _usuarioRepository.GetByEmailAsync(request.Email);
            if (usuarioExistente != null)
            {
                throw new Exception("El correo ya esta en uso por otra cuenta.");
            }

            var nuevoUsuario = new Usuario
            {
                Id = request.PersonaId,
                Email = request.Email,
                Password = _passwordHasher.Hash(request.Password), 
                FechaCreacion = DateTime.UtcNow,
                Rol = Rol.Gerente,
                Estado = Estado.Activo
            };


           
            await _usuarioRepository.AddAsync(nuevoUsuario);

            return "Usuario registrado con éxito";
        }
    }
}
