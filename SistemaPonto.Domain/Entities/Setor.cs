using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaPonto.Domain.Entities {
    [Table("setores")]
    public class Setor : EntidadeBase {
        [Required(ErrorMessage="O campo nome é obrigatório")]
        [MaxLength(100, ErrorMessage="O campo nome deve ter no máximo 100 caracteres")]
        [Column("nome")]
        public string Nome { get; set; }
    }
}