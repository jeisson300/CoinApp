using Back_coinAppNet.DB;
using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;

namespace Back_coinAppNet.Repository
{
    public class IncomeRepository : Repository<Income>, IIncome
    {
        private readonly ContextDB _db;
        public IncomeRepository(ContextDB db) : base(db)
        {
            _db = db;
        }

        public async Task<Income> UpdateAsync(Income income)
        {
            _db.Incomes.Update(income);
            await _db.SaveChangesAsync();
            return income;
        }

        public Income DtoToModel(IncomeDTO entity)
        {
            Income income = new()
            {
                Id = entity.Id,
                Name = entity.Name,
                Value = entity.Value,
                Date = entity.Date,
                UserId = entity.UserId,
            };

            return income;
        }
    }
}
