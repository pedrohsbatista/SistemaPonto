using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;

namespace SistemaPonto.Domain.IRepository {
    public interface IAdministrativoRepository : IGenericRepository<Administrativo> 
    {        
       Task<Administrativo> ReadByIdAsNoTracking(Guid id);
    }
}