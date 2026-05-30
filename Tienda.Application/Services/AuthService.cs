using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Application.DTOs;
using Tienda.Application.Interfaces;
using Tienda.Domain.Entitys;
using Tienda.Application.Interfaces;

namespace Tienda.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IJwtProvider _jwtProvider;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IPersonaRepository _personaRepository;

        public AuthService(IUsuarioRepository usuarioRepository, IJwtProvider jwtProvider,IPasswordHasher passwordHasher, IPersonaRepository personaRepository)
        {
            _usuarioRepository = usuarioRepository;
            _jwtProvider = jwtProvider;
            _passwordHasher = passwordHasher;
            _personaRepository = personaRepository;
        }

        public async Task<LoginRespose> LoginAsync(LoginRequest request)
        {
            var usuario = await _usuarioRepository.GetByEmailAsync(request.Email);

            if (usuario == null)
            {
                throw new Exception("Credenciales incorrectos");
            }

           if (!_passwordHasher.Verify(usuario.Password, request.Password))
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

            var usuarioExistente = await _usuarioRepository
                .GetByEmailAsync(request.Email);

            if (usuarioExistente is not null)
            {
                throw new Exception("El correo ya está en uso por otra cuenta.");
            }
            string ci = request.Ci;
            var personaExistente = await _personaRepository.GetByCiAsync(ci);

            if (personaExistente is not null)
            {
                throw new Exception("Ya existe una persona con ese CI.");
            }

            var nuevaPersona = new Persona
            {
                Nombre = request.Nombre,
                Apellido = request.Apellido,
                Ci = request.Ci,
                Telefono = request.Telefono,
                Direccion = request.Direccion,
            };

            await _personaRepository.AddAsync(nuevaPersona);

            var nuevoUsuario = new Usuario
            {
                Id = nuevaPersona.Id,

                Email = request.Email,

                Password = _passwordHasher
                    .Hash(request.Password),

                FechaCreacion = DateTime.UtcNow,

                Rol = Rol.EncargadoAlmacen,

                Estado = Estado.Activo
            };
            await _usuarioRepository.AddAsync(nuevoUsuario);

            return "Usuario registrado con éxito";
        }
    }
}
