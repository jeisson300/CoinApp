using System.Linq.Expressions;

namespace Back_coinAppNet.Repository.IRepository
{
    public interface IRepository <T> where T : class
    {
        Task CreateAsync (T entity);
        
        Task DeleteAsync (T entity);
        Task<T> GetAsync (Expression<Func<T, bool>>? filter = null );
        Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null);

        Task SaveAsync();
    }
}
