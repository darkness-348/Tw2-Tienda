using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Tienda.Application.Interfaces;

namespace Tienda.Infrastructure.Repositories
{
    // Adaptador para hacer compatible IDbContextTransaction con ITransaction
    public class TransactionAdapter : ITransaction
    {
        private readonly IDbContextTransaction _transaction;

        public TransactionAdapter(IDbContextTransaction transaction)
        {
            _transaction = transaction;
        }

        public async Task CommitAsync()
        {
            await _transaction.CommitAsync();
        }

        public async Task RollbackAsync()
        {
            await _transaction.RollbackAsync();
        }

        public void Dispose()
        {
            _transaction?.Dispose();
        }
    }

    public class TransactionManagerRepository : ITransactionManager
    {
        private readonly TiendaDBContext _context;
        public TransactionManagerRepository(TiendaDBContext context)
        {
            _context = context;
        }

        public async Task<ITransaction> BeginTransactionAsync()
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            return new TransactionAdapter(transaction);
        }
    }
}

