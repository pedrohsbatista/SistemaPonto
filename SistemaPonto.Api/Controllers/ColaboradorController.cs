using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Services;

namespace SistemaPonto.Api {
    [ApiController]
    [Route("api/[controller]")]
    public class ColaboradorController : GenericController<Colaborador> {
        public ColaboradorController(ColaboradorService service) : base(service){           
        }       
    }
}