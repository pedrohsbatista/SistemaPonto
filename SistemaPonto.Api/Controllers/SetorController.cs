using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Services;

namespace SistemaPonto.Api {
    public class SetorController : Controller {

        private readonly SetorService _setorService;

        public SetorController(SetorService setorService){
            _setorService = setorService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Setor>> Get(Guid id){
          return await _setorService.ReadById(id);
        }
    }
}