using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;

namespace SistemaPonto.Domain.IRepository {
    public interface IColaboradorRepository : IGenericRepository<Colaborador> 
    {
        Task<Colaborador> ReadByIdAsNoTracking(Guid id);
    }
}