using Back_coinAppNet.DB;
using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;

namespace Back_coinAppNet.Repository
{
    public class BillRepository : Repository<Bill>, IBill
    {
        private readonly ContextDB _db;
        public BillRepository(ContextDB db) : base(db)
        {
            _db = db;
        }
        public async Task<Bill> UpdateAsync(Bill bill)
        {
            _db.Bills.Update(bill);
            await _db.SaveChangesAsync();
            return bill;
        }      
    }
}
