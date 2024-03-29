using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories{
    public class SetorRepository : GenericRepository<Setor>, ISetorRepository
    {
        public SetorRepository(DataContext dataContext) : base(dataContext){
        }            
    }
}