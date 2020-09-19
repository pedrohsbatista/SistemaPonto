using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;

namespace SistemaPonto.Domain.Services {
  public class AdministrativoService : GenericService<Administrativo> {
    private readonly IAdministrativoRepository _repository;
    private readonly IUsuarioRepository _usuarioRepository;

    public AdministrativoService (IAdministrativoRepository repository, IUsuarioRepository usuarioRepository) : base (repository) {
      _repository = repository;
      _usuarioRepository = usuarioRepository;
    }

    public override async Task<Administrativo> Update (Administrativo entidade) {
      await Verify(entidade);
      if (string.IsNullOrEmpty (entidade.Senha)) {
        var administrativo = await _repository.ReadByIdAsNoTracking ((Guid) entidade.Id);
        entidade.Senha = administrativo.Senha;       
      } 

      return await _repository.Update (entidade);
    }

    public override async Task Verify (Administrativo entidade) {
      var ok = await _usuarioRepository.Read(x => x.Id != entidade.Id && x.Login == entidade.Login);

      if (ok.Count > 0) {
        throw new Exception ("Login já utilizado");
      }
    }
  }
}