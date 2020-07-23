using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class MovimentacaoService : GenericService<Movimentacao> {
        public MovimentacaoService(IGenericRepository<Movimentacao> repository) : base(repository) {           
        }
    }
}