using System;
using System.Threading.Tasks;

namespace SistemaPonto.Domain.Interface{
    public interface ICognitiveService
    {
        Task CreatePersonGroup();
        Task TrainGroup();
        Task<Guid> CreatePerson(string nome);
        Task UpdatePerson(Guid id, string nome);
        Task DeletePerson(Guid personId);        
    }
}