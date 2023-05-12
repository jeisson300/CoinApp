using Back_coinAppNet.DB;
using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;

namespace Back_coinAppNet.Repository
{
    public class HoldingRepository : Repository<Holding>, IHolding
    {
        private readonly ContextDB _db;
        public HoldingRepository(ContextDB db) : base(db)
        {
            _db = db;
        }

        public async Task<Holding> UpdateAsync(Holding holding)
        {
            _db.Holdings.Update(holding);
            await _db.SaveChangesAsync();
            return holding;
        }
    }
}
