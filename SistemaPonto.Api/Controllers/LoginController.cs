using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Services;
using SistemaPonto.Domain.Views;

namespace SistemaPonto.Api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller {
   
        private readonly UsuarioService _usuarioService;

        public LoginController(UsuarioService usuarioService) {  
            _usuarioService = usuarioService;         
        }   
    
        [HttpPost]
        public async Task<ActionResult<TokenView>> Login([FromBody] LoginView loginVm)
        {
            var usuario = await _usuarioService.ReadByLogin(loginVm);

            if(usuario == null)
            {
               return NotFound("Login e/ou Senha inválidos");
            }
            
            var token = TokenService.GenerateToken(usuario);

            var tokenVm = new TokenView(usuario.Nome, token);

            return tokenVm;
        }  
    }
}