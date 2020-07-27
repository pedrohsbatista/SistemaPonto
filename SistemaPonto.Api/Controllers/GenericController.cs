using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        public async Task<ActionResult<T>> Post([FromBody] T entidade)
        {
            return await _genericService.Create(entidade);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<T>>> Get()
        {
           return await _genericService.Read();
        }

        [HttpGet("{id:guid}")]
        [Authorize]
        public async Task<ActionResult<T>> Get(Guid id)
        {
           return await _genericService.ReadById(id);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<T>> Put([FromBody] T entidade)
        {
            return await _genericService.Update(entidade);
        }   

        [HttpDelete("{id:guid}")]
        [Authorize]
        public async Task<ActionResult<T>> Delete(Guid id)
        {
            return await _genericService.Delete(id);
        } 
    }
}