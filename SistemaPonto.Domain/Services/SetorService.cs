using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class SetorService : GenericService<Setor> {
        public SetorService(IGenericRepository<Setor> repository) : base(repository) {           
        }
    }
}