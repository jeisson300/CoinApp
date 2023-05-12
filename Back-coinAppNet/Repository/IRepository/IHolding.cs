using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;

namespace Back_coinAppNet.Repository.IRepository
{
    public interface IHolding  : IRepository<Holding>
    {
        Task<Holding> UpdateAsync(Holding holding);    
    }
}
