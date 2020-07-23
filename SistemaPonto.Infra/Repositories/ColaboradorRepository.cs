using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories{
    public class ColaboradorRepository : GenericRepository<Colaborador>, IColaboradorRepository
    {
        public ColaboradorRepository(DataContext dataContext) : base(dataContext){
        }            
    }
}