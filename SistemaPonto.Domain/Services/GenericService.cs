using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class GenericService<T> where T : class
    {        
        private readonly IGenericRepository<T> _genericRepository;

        public GenericService(IGenericRepository<T> genericRepository) {
            _genericRepository = genericRepository;
        }

        public async Task<T> ReadById(Guid id)
        {
            return await _genericRepository.ReadById(id);
        }
    }
}