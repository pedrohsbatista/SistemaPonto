using System;
using System.Threading.Tasks;

namespace SistemaPonto.Domain.Interface{
    public interface ICognitiveService
    {
        Task<(Guid, Guid?)> CreatePerson(string nome, byte[] imagem);
        Task<Guid?> UpdatePerson(Guid person, string nome, byte[] imagem, Guid? persistedFaceId);
        Task DeletePerson(Guid personId);      
        Task<Guid?>  Identify(byte[] imagem);
    }
}