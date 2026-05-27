using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Application.Interfaces;

namespace Tienda.Infrastructure.Auth
{
    public class BcryptPasswordHasher: IPasswordHasher
    {
        public string Hash(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        public bool Verify(string passwordHash, string inputpassword)
        {
            return BCrypt.Net.BCrypt.Verify(inputpassword, passwordHash);
        }
    }
}
