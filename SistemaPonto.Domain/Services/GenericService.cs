using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class GenericService<T> where T : class
    {        
        private readonly IGenericRepository<T> _genericRepository;

        public GenericService(IGenericRepository<T> genericRepository) {
            _genericRepository = genericRepository;
        }
        public virtual async Task<T> Create(T entidade)
        {
          await Verify(entidade);
          return await _genericRepository.Create(entidade);
        }

        public virtual async Task<List<T>> Read()
        {
            return await _genericRepository.Read();
        }
        
        public virtual async Task<T> ReadById(Guid id)
        {
            return await _genericRepository.ReadById(id);
        }

        public virtual async Task<T> Update(T entidade)
        {
            await Verify(entidade);
            return await _genericRepository.Update(entidade);
        }

        public virtual async Task<T> Delete(T entidade)
        {
            return await _genericRepository.Delete(entidade);
        }

        public virtual Task Verify(T entidade)
        {
           return Task.CompletedTask;
        }
    }
}