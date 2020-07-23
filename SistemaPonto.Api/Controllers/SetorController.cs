using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Services;

namespace SistemaPonto.Api {
    [ApiController]
    [Route("api/[controller]")]
    public class SetorController : Controller {

        private readonly SetorService _setorService;

        public SetorController(SetorService setorService){
            _setorService = setorService;
        }

        [HttpGet("get/{id:guid}")]
        public async Task<ActionResult<Setor>> Get(Guid id)
        {
          return await _setorService.ReadById(id);
        }
    }
}