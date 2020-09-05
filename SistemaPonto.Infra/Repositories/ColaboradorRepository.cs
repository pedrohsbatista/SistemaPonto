using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Domain.IRepository;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories{
    public class ColaboradorRepository : GenericRepository<Colaborador>, IColaboradorRepository
    {
        private readonly HorarioRepository _horarioRepository;

        public ColaboradorRepository(DataContext dataContext, HorarioRepository horarioRepository) : base(dataContext){
            _horarioRepository = horarioRepository;
        }            

        public override async Task<Colaborador> Create(Colaborador entidade)
        {
            _dataContext.Entry(entidade).State = EntityState.Added;
            _dataContext.Colaboradores.Add(entidade);
            _dataContext.Horarios.AddRange(entidade.Horarios);
            await _dataContext.SaveChangesAsync();    
            return entidade;
        }

        public override async Task<Colaborador> Update(Colaborador entidade)
        {
            var result = await _horarioRepository.ReadByColaboradorIdAsNoTracking((Guid)entidade.Id);
            _dataContext.Entry(entidade).State = EntityState.Modified;
            _dataContext.Horarios.RemoveRange(result);
            _dataContext.Horarios.AddRange(entidade.Horarios);
            await _dataContext.SaveChangesAsync();    
            return entidade;
        }

        public override async Task<Colaborador> Delete(Guid id)
        {
           var entidade = await ReadById(id);
           _dataContext.Colaboradores.Remove(entidade);
           _dataContext.Horarios.RemoveRange(entidade.Horarios);
           await _dataContext.SaveChangesAsync();    
           return entidade;    
        }        
    }
}