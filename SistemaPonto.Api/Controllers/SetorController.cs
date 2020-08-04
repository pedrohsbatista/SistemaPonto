using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Services;

namespace SistemaPonto.Api {
    [ApiController]
    [Route("api/[controller]")]
    public class SetorController : GenericController<Setor> {
        public SetorController(SetorService service) : base(service){           
        }      
    }
}