using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SistemaPonto.Domain.Enums;

namespace SistemaPonto.Domain.Entities {
    [Table("horarios")]
    public class Horario : EntidadeBase {
        [ForeignKey("colaboradorid")]
        public virtual Colaborador Colaborador { get; set; }
        [Required(ErrorMessage="O campo dia da semana é obrigatório")]
        [Column("diasemana")]
        public DiaSemana DiaSemana { get; set; }
        [Required(ErrorMessage="O campo início é obrigatório")]
        [Column("inicio")]
        public TimeSpan Inicio { get; set; } 
        [Required(ErrorMessage="O campo fim é obrigatório")]
        [Column("fim")]
        public TimeSpan Fim { get; set; } 
    }
}