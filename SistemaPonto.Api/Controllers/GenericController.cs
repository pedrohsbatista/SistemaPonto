using System;
using System.Collections.Generic;
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

        [HttpPost]
        public async Task<ActionResult<T>> Post([FromBody] T entidade)
        {
            return await _genericService.Create(entidade);
        }

        [HttpGet]
        public async Task<ActionResult<List<T>>> Get()
        {
           return await _genericService.Read();
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<T>> Get(Guid id)
        {
           return await _genericService.ReadById(id);
        }

        [HttpPut]
        public async Task<ActionResult<T>> Put([FromBody] T entidade)
        {
            return await _genericService.Update(entidade);
        }   

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<T>> Delete(Guid id)
        {
            return await _genericService.Delete(id);
        } 
    }
}