using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace SistemaPonto.Domain.IRepository {
    public interface IGenericRepository<T> where T : class
    {
        Task<T> Create(T entidade);
        Task<List<T>> Read();
        Task<T> ReadById(Guid id);
        Task<T> Update(T entidade);
        Task<T> Delete(T entidade);
        Task<List<T>> Read(Expression<Func<T, bool>>  predicate);
    }
}