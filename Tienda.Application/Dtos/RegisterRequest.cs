using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Application.DTOs
{
    public class RegisterRequest
    {
        public int PersonaId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

    }
}
