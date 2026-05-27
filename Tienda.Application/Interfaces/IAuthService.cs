using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Application.DTOs;

namespace Tienda.Application.Interfaces
{
    public interface IAuthService
    {
        Task<LoginRespose> LoginAsync(LoginRequest request);
        Task<string>RegisterAsync(RegisterRequest request);
    }
}
