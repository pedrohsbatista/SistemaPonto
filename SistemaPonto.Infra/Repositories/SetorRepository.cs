using System;
using System.Threading.Tasks;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories{
    public class SetorRepository : ISetorRepository
    {
        public DataContext _dataContext;

        public SetorRepository(DataContext dataContext){
            _dataContext = dataContext;
        }

        public Task<Setor> ReadById(Guid id)
        {
            return _dataContext.Setores.FindAsync(id).AsTask();             
        }
    }
}