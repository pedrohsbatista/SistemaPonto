using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Services;

namespace SistemaPonto.Api {
    [ApiController]
    [Route("api/[controller]")]
    public class AdministrativoController : GenericController<Administrativo> {
        public AdministrativoController(AdministrativoService service) : base(service){           
        }      
    }
}