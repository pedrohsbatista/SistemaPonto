using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories{
    public class MovimentacaoRepository : GenericRepository<Movimentacao>, IMovimentacaoRepository
    {
        public MovimentacaoRepository(DataContext dataContext) : base(dataContext){
        }            
    }
}