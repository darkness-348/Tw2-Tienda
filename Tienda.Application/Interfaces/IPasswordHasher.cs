using System;
using System.Collections.Generic;
using System.Text;

namespace Tienda.Application.Interfaces
{
    public interface IPasswordHasher
    {
        string Hash(string password);
        bool Verify (string passwordHash, string inputpassword);
    }
}
