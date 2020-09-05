using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaPonto.Domain.Entities;
using SistemaPonto.Infra.Data;

namespace SistemaPonto.Infra.Repositories{
    public class HorarioRepository : GenericRepository<Horario>
    {
        public HorarioRepository(DataContext dataContext) : base(dataContext){
        }

        public async Task<List<Horario>> ReadByColaboradorIdAsNoTracking(Guid id)
        {
            return await _dataContext.Horarios.AsNoTracking().Where(x => x.Colaborador.Id == id).ToListAsync();
        }
    }
}