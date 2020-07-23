using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class ColaboradorService : GenericService<Colaborador> {
        public ColaboradorService(IGenericRepository<Colaborador> repository) : base(repository) {           
        }
    }
}