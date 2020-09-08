using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Domain.Interface;
using System;

namespace SistemaPonto.Domain.Services {
    public class ColaboradorService : GenericService<Colaborador> {
        private IColaboradorRepository _colaboradorRepository;
        private readonly ICognitiveService _cognitiveService;
        public ColaboradorService(IColaboradorRepository repository, ICognitiveService cognitiveService) : base(repository) {  
            _colaboradorRepository = repository;
            _cognitiveService = cognitiveService;
        }

        public override async Task<Colaborador> Create(Colaborador entidade)
        {
          var personId = await _cognitiveService.CreatePerson(entidade.Nome);
          entidade.PersonId = personId;
          return await _colaboradorRepository.Create(entidade);
        }

        public override async Task<Colaborador> Update(Colaborador entidade)
        {
            await _cognitiveService.UpdatePerson(entidade.PersonId, entidade.Nome);
            return await _colaboradorRepository.Update(entidade);
        }

        public override async Task<Colaborador> Delete(Colaborador entidade)
        {
            await _cognitiveService.DeletePerson(entidade.PersonId);
            return await _colaboradorRepository.Delete(entidade);
        }
    }
}