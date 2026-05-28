using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Dtos
{
    
    public class UsuarioDTO
    {
        public string Nombre { get; set; }
        public string Email { get; set; }
        public Rol Rol { get; set; }
        public Estado Estado { get; set; }
    }
}
