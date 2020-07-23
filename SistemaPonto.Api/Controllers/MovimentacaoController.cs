using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Services;

namespace SistemaPonto.Api {
    [ApiController]
    [Route("api/[controller]")]
    public class MovimentacaoController : GenericController<Movimentacao> {
        public MovimentacaoController(GenericService<Movimentacao> service) : base(service){           
        }      
    }
}