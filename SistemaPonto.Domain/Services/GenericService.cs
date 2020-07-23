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
        public async Task<T> Create(T entidade)
        {
          return await _genericRepository.Create(entidade);
        }

        public async Task<List<T>> Read()
        {
            return await _genericRepository.Read();
        }
        
        public async Task<T> ReadById(Guid id)
        {
            return await _genericRepository.ReadById(id);
        }

        public async Task<T> Update(T entidade)
        {
            return await _genericRepository.Update(entidade);
        }

        public async Task<T> Delete(Guid id)
        {
            return await _genericRepository.Delete(id);
        }
    }
}