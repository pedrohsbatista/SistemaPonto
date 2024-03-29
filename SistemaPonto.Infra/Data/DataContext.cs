using Microsoft.EntityFrameworkCore;
using SistemaPonto.Domain.Entities;

namespace SistemaPonto.Infra.Data {
    public class DataContext : DbContext {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Administrativo> Administrativos { get; set; }
        public DbSet<Colaborador> Colaboradores { get; set; }
        public DbSet<Horario> Horarios { get; set; }
        public DbSet<Movimentacao> Movimentacoes { get; set; }
        public DbSet<Setor> Setores { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().HasDiscriminator<string>("tipo");
            modelBuilder.Entity<Setor>().HasIndex(x => x.Nome).IsUnique();
            modelBuilder.Entity<Usuario>().HasIndex(x => x.Login).IsUnique();
            modelBuilder.Entity<Colaborador>().HasIndex(x => x.Cpf).IsUnique();
        }
    }  
}