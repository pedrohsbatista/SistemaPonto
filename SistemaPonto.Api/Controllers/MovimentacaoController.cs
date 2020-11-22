using Microsoft.AspNetCore.Mvc;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.Services;
using System.Threading.Tasks;
using System;
using SistemaPonto.Domain.Views;

namespace SistemaPonto.Api {
    [ApiController]
    [Route("api/[controller]")]
    public class MovimentacaoController : GenericController<Movimentacao> {

        private readonly MovimentacaoService _service;
        public MovimentacaoController(MovimentacaoService service) : base(service){   
            _service = service;        
        }     
        
        [HttpPost("PostMovimentacao")]
        public async Task<ActionResult<Movimentacao>> PostMovimentacao([FromBody] CapturaView capturaView)
        {
            try
            {
                return await _service.CreateMovimentacao(capturaView.Imagem);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);                
            }           
        } 
    }
}