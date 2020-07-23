using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Services;

namespace SistemaPonto.Api {
    [ApiController]
    [Route("api/[controller]")]
    public class GenericController<T> : Controller  where T : class{

        private readonly GenericService<T> _genericService;

        public GenericController(GenericService<T> genericService){
            _genericService = genericService;
        }

        [HttpGet("get/{id:guid}")]
        public async Task<ActionResult<T>> Get(Guid id)
        {
           return await _genericService.ReadById(id);
        }
    }
}