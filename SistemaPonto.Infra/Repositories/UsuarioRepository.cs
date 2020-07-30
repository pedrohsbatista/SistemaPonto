using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Domain.Views;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories
{ 
    public class UsuarioRepository : GenericRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(DataContext dataContext) : base(dataContext){
        }

        public async Task<Usuario> ReadByLogin(LoginView loginVm)
        {
          return await _dataContext.Usuarios.SingleOrDefaultAsync(x => x.Login == loginVm.Login && x.Senha == loginVm.Senha);
        }    
    }  
}