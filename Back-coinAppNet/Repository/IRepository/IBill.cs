using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;

namespace Back_coinAppNet.Repository.IRepository
{
    public interface IBill : IRepository<Bill>
    {
        Task<Bill> UpdateAsync(Bill bill);
    }
}
