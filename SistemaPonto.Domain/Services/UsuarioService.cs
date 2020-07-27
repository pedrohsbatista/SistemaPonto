using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Domain.Views;

namespace SistemaPonto.Domain.Services {
    public class UsuarioService : GenericService<Usuario>{

        private readonly IUsuarioRepository _usuarioRepository;
         
        public UsuarioService(IGenericRepository<Usuario> repository, IUsuarioRepository usuarioRepository) : base(repository){            
           _usuarioRepository = usuarioRepository;
        }

        public async Task<Usuario> ReadByLogin(LoginView loginVm)
        {
           return await _usuarioRepository.ReadByLogin(loginVm);
        }         
    }
}