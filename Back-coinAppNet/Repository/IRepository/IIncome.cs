using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;

namespace Back_coinAppNet.Repository.IRepository
{
    public interface IIncome: IRepository<Income>
    {
        Task<Income> UpdateAsync(Income income);
        Income DtoToModel(IncomeDTO entity);
    }
}
