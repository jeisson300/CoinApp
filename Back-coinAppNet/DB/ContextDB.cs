using Back_coinAppNet.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_coinAppNet.DB
{
    public class ContextDB: DbContext
    {
        public ContextDB(DbContextOptions<ContextDB> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Holding> Holdings { get; set; }
    }
}
