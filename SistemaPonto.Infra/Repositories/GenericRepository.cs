using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace SistemaPonto.Infra.Repositories {
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        public DataContext _dataContext;
        public GenericRepository(DataContext dataContext){
            _dataContext = dataContext;
        }
      
        public virtual async Task<T> Create(T entidade)
        {
            _dataContext.Entry(entidade).State = EntityState.Added;
            _dataContext.Set<T>().Add(entidade);
            await _dataContext.SaveChangesAsync();    
            return entidade;
        }

        public virtual async Task<List<T>> Read()
        {
            return await _dataContext.Set<T>().ToListAsync();             
        }

        public virtual async Task<T> ReadById(Guid id)
        {
            return await _dataContext.Set<T>().FindAsync(id);             
        }

        public virtual async Task<T> Update(T entidade)
        {
            _dataContext.Entry(entidade).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();    
            return entidade;
        }

        public virtual async Task<T> Delete(T entidade)
        {
           _dataContext.Set<T>().Remove(entidade);
           await _dataContext.SaveChangesAsync();    
           return entidade;    
        }

        public virtual Task<List<T>> Read(Expression<Func<T, bool>> predicate)
        {
            return _dataContext.Set<T>().Where(predicate).ToListAsync();
        }
    }
}