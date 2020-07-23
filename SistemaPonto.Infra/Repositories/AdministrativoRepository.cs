using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories{
    public class AdministrativoRepository : GenericRepository<Administrativo>, IAdministrativoRepository
    {
        public AdministrativoRepository(DataContext dataContext) : base(dataContext){
        }            
    }
}