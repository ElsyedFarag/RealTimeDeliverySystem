using System.Linq.Expressions;

namespace RealTimeDeliverySystem.Application.Interfaces
{
    public interface IRepository<T> where T : class
    {
        // CREATE
        Task<T> AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);

        // READ
        Task<T?> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

        // UPDATE
        void Update(T entity);
        void UpdateRange(IEnumerable<T> entities);

        // DELETE
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);
    }
}