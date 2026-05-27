using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain;

namespace Tienda.Application.DTOs
{
    public class LoginRespose
    {
        public string Token { get; set;  } = string.Empty;
        public string Rol { get; set; } = string.Empty;

    }
}
