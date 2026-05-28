using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Domain.Interfaces
{
    public interface IPersonaRepository
    {
        Task<Persona> GetByCiAsync(string ci);
        Task<Persona> AddAsync(Persona persona);
    }
}
