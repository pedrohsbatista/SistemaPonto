using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace SistemaPonto.Domain.Entities
{
    [Table("usuarios")]
    public class Usuario : EntidadeBase {            
        [Required(ErrorMessage="O campo nome é obrigatório")]
        [MaxLength(100, ErrorMessage="O campo nome deve ter no máximo 100 caracteres")]
        [Column("nome")]
        public string Nome { get; set; } 
        [Required(ErrorMessage="O campo login é obrigatório")]
        [MaxLength(100, ErrorMessage="O campo login deve ter no máximo 100 caracteres")]
        [Column("login")]
        public string Login { get; set; }
        [MaxLength(50, ErrorMessage="O campo senha deve ter no máximo 50 caracteres")]
        [MinLength(6, ErrorMessage="O campo senha deve ter no mínimo 6 caracteres")]
        [Column("senha")]
        [JsonIgnore]
        public string Senha { get; set; }
        private string _password;
        [NotMapped]
        public string Password
        {
            get
            {
                return _password;
            }
            set
            {
                _password = value;

                if(!string.IsNullOrEmpty(_password))
                {
                   Senha = _password;
                }                
            }
        }
    }
}