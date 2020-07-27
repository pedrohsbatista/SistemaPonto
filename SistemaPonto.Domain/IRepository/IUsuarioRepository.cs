
using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Views;

namespace SistemaPonto.Domain.IRepository {
    public interface IUsuarioRepository : IGenericRepository<Usuario>
    {
        Task<Usuario> ReadByLogin(LoginView loginVm);
    }    
}