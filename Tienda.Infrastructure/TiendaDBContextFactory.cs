using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Tienda.Infrastructure
{
    public class TiendaDBContextFactory : IDesignTimeDbContextFactory<TiendaDBContext>
    {
        public TiendaDBContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../Tienda.Api"))
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<TiendaDBContext>();
            optionsBuilder.UseNpgsql(connectionString);

            return new TiendaDBContext(optionsBuilder.Options);
        }
    }
}
