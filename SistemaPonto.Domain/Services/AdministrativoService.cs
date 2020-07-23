using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class AdministrativoService : GenericService<Administrativo> {
        public AdministrativoService(IGenericRepository<Administrativo> repository) : base(repository) {           
        }
    }
}