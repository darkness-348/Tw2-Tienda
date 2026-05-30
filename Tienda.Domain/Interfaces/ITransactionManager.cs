using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Tienda.Domain.Interfaces
{
    public interface ITransaction : IDisposable
    {
        Task CommitAsync();
        Task RollbackAsync();
    }

    public interface ITransactionManager
    {
        Task<ITransaction> BeginTransactionAsync();
    }
}

