using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class ColaboradorService : GenericService<Colaborador> {
        public ColaboradorService(IColaboradorRepository repository) : base(repository) {           
        }
    }
}