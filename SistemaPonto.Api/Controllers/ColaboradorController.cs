using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Services;

namespace SistemaPonto.Api {
    [ApiController]
    [Route("api/[controller]")]
    public class ColaboradorController : GenericController<Colaborador> {
        public ColaboradorController(GenericService<Colaborador> service) : base(service){           
        }       
    }
}