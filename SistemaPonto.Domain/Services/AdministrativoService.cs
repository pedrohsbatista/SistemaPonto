using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
    public class AdministrativoService : GenericService<Administrativo> {
        private readonly IAdministrativoRepository _administrativoRepository;
        public AdministrativoService(IAdministrativoRepository repository) : base(repository) {   
            _administrativoRepository = repository; 
        }
        public override async Task<Administrativo> Update(Administrativo entidade)
        {
            if (string.IsNullOrEmpty(entidade.Senha)){
              var administrativo = await _administrativoRepository.ReadByIdAsNoTracking((Guid)entidade.Id);    
              entidade.Senha = administrativo.Senha;
              return await _administrativoRepository.Update(entidade);    
            } else {
              return await _administrativoRepository.Update(entidade);
            }           
        }
    }
}