using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Domain.Interface;
using System;

namespace SistemaPonto.Domain.Services {
    public class ColaboradorService : GenericService<Colaborador> {
        private readonly IColaboradorRepository _repository;
        private readonly ICognitiveService _cognitiveService;
        private readonly IUsuarioRepository _usuarioRepository;

        public ColaboradorService(IColaboradorRepository repository, ICognitiveService cognitiveService,
           IUsuarioRepository usuarioRepository) : base(repository) {  
            _repository = repository;
            _cognitiveService = cognitiveService;
            _usuarioRepository = usuarioRepository;
        }

        public override async Task<Colaborador> Create(Colaborador entidade)
        {
          await Verify(entidade);
          var personId = await _cognitiveService.CreatePerson(entidade.Nome);
          entidade.PersonId = personId;
          return await _repository.Create(entidade);
        }

        public override async Task<Colaborador> Update(Colaborador entidade)
        {
            await Verify(entidade);
            await _cognitiveService.UpdatePerson(entidade.PersonId, entidade.Nome);
            return await _repository.Update(entidade);
        }

        public override async Task<Colaborador> Delete(Colaborador entidade)
        {
            await _cognitiveService.DeletePerson(entidade.PersonId);
            return await _repository.Delete(entidade);
        }

        public override async Task Verify(Colaborador entidade)
        {
            var ok = await _usuarioRepository.Read(x => x.Id != entidade.Id && x.Login == entidade.Login);

            if (ok.Count > 0)
            {
                throw new Exception("Login já utilizado");
            }
        }  
    }
}