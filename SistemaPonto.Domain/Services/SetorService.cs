using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class SetorService {
        private readonly ISetorRepository _setorRepository;

        public SetorService(ISetorRepository setorRepository) {
            _setorRepository = setorRepository;
        }

        public async Task<Setor> ReadById(Guid id)
        {
            return await _setorRepository.ReadById(id);
        }
    }
}