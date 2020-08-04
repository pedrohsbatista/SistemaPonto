using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class SetorService : GenericService<Setor> {
        public SetorService(ISetorRepository repository) : base(repository) {           
        }
    }
}