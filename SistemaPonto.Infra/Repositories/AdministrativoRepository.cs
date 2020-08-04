using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories{
    public class AdministrativoRepository : GenericRepository<Administrativo>, IAdministrativoRepository
    {
        public AdministrativoRepository(DataContext dataContext) : base(dataContext){
        }         

        public async Task<Administrativo> ReadByIdAsNoTracking(Guid id)
        {
            return await _dataContext.Administrativos.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}