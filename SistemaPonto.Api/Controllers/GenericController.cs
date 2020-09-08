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
        public virtual async Task<ActionResult<T>> Post([FromBody] T entidade)
        {
            try
            {
               return await _genericService.Create(entidade);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);                
            }           
        }

        [HttpGet]
        [Authorize]
        public virtual async Task<ActionResult<List<T>>> Get()
        {
            try
            {
               return await _genericService.Read();
            }
            catch(Exception ex)
            {
               return BadRequest(ex.Message);                
            }    
        }

        [HttpGet("{id:guid}")]
        [Authorize]
        public virtual async Task<ActionResult<T>> Get(Guid id)
        {
            try
            {
                var entidade = await _genericService.ReadById(id);

                if (entidade == null)
                {
                   return NotFound("Nenhum registro encontrado");
                }

                return entidade;
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);                
            }    
        }

        [HttpPut]
        [Authorize]
        public virtual async Task<ActionResult<T>> Put([FromBody] T entidade)
        {            
            try
            {
              return await _genericService.Update(entidade);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);                
            }    
        }   

        [HttpDelete("{id:guid}")]
        [Authorize]
        public virtual async Task<ActionResult<T>> Delete(Guid id)
        {
            try
            {
                var entidade =  await _genericService.ReadById(id);

                if (entidade == null)
                {
                    return NotFound("Nenhum registro encontrado");
                }

                return await _genericService.Delete(entidade);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);                
            } 
        } 
    }
}