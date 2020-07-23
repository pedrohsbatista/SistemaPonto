using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories {
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        public DataContext _dataContext;
        public GenericRepository(DataContext dataContext){
            _dataContext = dataContext;
        }
      
        public Task<T> ReadById(Guid id)
        {
            return _dataContext.Set<T>().FindAsync(id).AsTask();             
        }
    }
}