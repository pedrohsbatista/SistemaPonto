using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;
using Microsoft.EntityFrameworkCore;

namespace SistemaPonto.Infra.Repositories {
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        public DataContext _dataContext;
        public GenericRepository(DataContext dataContext){
            _dataContext = dataContext;
        }
      
        public async Task<T> Create(T entidade)
        {
            _dataContext.Set<T>().Add(entidade);
            await _dataContext.SaveChangesAsync();    
            return entidade;
        }

        public async Task<List<T>> Read()
        {
            return await _dataContext.Set<T>().ToListAsync();             
        }

        public async Task<T> ReadById(Guid id)
        {
            return await _dataContext.Set<T>().FindAsync(id);             
        }

        public async Task<T> Update(T entidade)
        {
            _dataContext.Entry(entidade).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();    
            return entidade;
        }

        public async Task<T> Delete(Guid id)
        {
           var entidade = await ReadById(id);
           _dataContext.Set<T>().Remove(entidade);
           await _dataContext.SaveChangesAsync();    
           return entidade;    
        }
    }
}