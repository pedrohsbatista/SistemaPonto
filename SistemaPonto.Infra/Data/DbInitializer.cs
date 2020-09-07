using System.Collections.Generic;
using System.Linq;
using SistemaPonto.Domain.Entities;

namespace SistemaPonto.Infra.Data{
    public static class DbInitializar
    {
        public static void Initialize(DataContext dataContext)
        {
            dataContext.Database.EnsureCreated();

            if (!dataContext.Setores.Any())
            {
               var setores = new List<Setor>
               {
                  new Setor
                  {
                    Nome = "Financeiro"
                  },
                  new Setor
                  {
                    Nome = "Recursos Humanos"
                  },
               };

               dataContext.AddRange(setores);
               dataContext.SaveChanges();
            }

            if(!dataContext.Administrativos.Any())
            {
                var administrativo = new Administrativo
                {
                    Nome = "Pedro",
                    Login = "pedro@email.com",
                    Senha = "123456"
                };

                dataContext.Administrativos.Add(administrativo);
                dataContext.SaveChanges();
            }
        }
    }
}