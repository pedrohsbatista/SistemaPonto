using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SistemaPonto.Domain.Enums;

namespace SistemaPonto.Domain.Entities {
    [Table("movimentacoes")]
    public class Movimentacao : EntidadeBase {
        [Required(ErrorMessage="O campo colaborador é obrigatório")]
        [ForeignKey("colaboradorid")]
        public virtual Colaborador Colaborador  { get; set; }
        [Required(ErrorMessage="O campo data movimentação é obrigatório")]
        [Column("datamovimentacao")]
        public DateTime DataMovimentacao  { get; set; }
        [Required(ErrorMessage="O campo tipo da movimentação é obrigatório")]
        [Column("tipomovimentacao")]
        public TipoMovimentacao TipoMovimentacao { get; set; }
    }
}