using System;
using System.Threading.Tasks;

namespace SistemaPonto.Domain.IRepository {
    public interface IGenericRepository<T> where T : class
    {
        Task<T> ReadById(Guid id);
    }
}