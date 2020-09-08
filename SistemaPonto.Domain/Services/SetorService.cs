using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using System.Threading.Tasks;
using System;

namespace SistemaPonto.Domain.Services {
    public class SetorService : GenericService<Setor> {
  
        private readonly ISetorRepository _repository;

        public SetorService(ISetorRepository repository) : base(repository) {        
            _repository = repository;   
        }

        public override async Task Verify(Setor entidade)
        {
            var ok = await _repository.Read(x => x.Id != entidade.Id && x.Nome.ToUpper() == entidade.Nome.ToUpper());

            if(ok.Count > 0)
            {
                throw new Exception("Setor já cadastrado com esse nome");
            }
        }
    }
}