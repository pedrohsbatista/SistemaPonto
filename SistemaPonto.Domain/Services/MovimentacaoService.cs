using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.Interface;
using SistemaPonto.Domain.Enums;
using System.Linq;

namespace SistemaPonto.Domain.Services {
    public class MovimentacaoService : GenericService<Movimentacao> {
        
        private readonly IMovimentacaoRepository _repository;        
        private readonly ICognitiveService _cognitiveService;
        private readonly IColaboradorRepository _colaboradorRepository;

        public MovimentacaoService(IMovimentacaoRepository repository, ICognitiveService cognitiveService,
            IColaboradorRepository colaboradorRepository) : base(repository) {           
            _repository = repository;
            _cognitiveService = cognitiveService;
            _colaboradorRepository = colaboradorRepository;
        }

        public async Task<Movimentacao> CreateMovimentacao(byte[] imagem)
        {         
           var personId = await _cognitiveService.Identify(imagem);

           if(!personId.HasValue){
               throw new Exception("Não foi possivel realizar a identificação, por favor tente novamente");
           }

           var colaboradores =  await _colaboradorRepository.Read(x => x.PersonId == personId);
           var colaborador = colaboradores.FirstOrDefault();

           if(colaborador == null)
           {
               throw new Exception("Não foi possível encontrar o colaborador");
           }

           var movimentacao = new Movimentacao
           {
              Colaborador = colaborador,
              TipoMovimentacao = await ReturnTipoMovimentacao(colaborador.Id),
              DataMovimentacao = DateTime.Now, 
              Imagem =  imagem
           };

           return await _repository.Create(movimentacao);
        }

        private async Task<TipoMovimentacao> ReturnTipoMovimentacao(Guid? colaboradorId)
        {
            var movimentacoes =  await _repository.Read(x => x.Colaborador.Id == colaboradorId && x.DataMovimentacao.Date == DateTime.Now.Date);
            var movimentacao = movimentacoes.OrderBy(x => x.DataMovimentacao).LastOrDefault();

            if (movimentacao == null)
            {
                return TipoMovimentacao.Entrada;
            }
            else
            {
                return movimentacao.TipoMovimentacao == TipoMovimentacao.Entrada ?  TipoMovimentacao.Saida : TipoMovimentacao.Entrada;               
            }            
        }
    }
}