namespace SistemaPonto.Domain.Entities {
    public class Usuario : EntidadeBase {            
        public string Nome { get; set; } 
        public string Login { get; set; }
        public string Senha { get; set; }
    }
}