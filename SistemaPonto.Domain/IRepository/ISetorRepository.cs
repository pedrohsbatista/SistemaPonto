using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;

namespace SistemaPonto.Domain.IRepository {
    public interface ISetorRepository
    {
        Task<Setor> ReadById(Guid id);
    }
}