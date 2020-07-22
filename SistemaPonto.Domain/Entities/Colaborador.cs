using System.Collections.Generic;

namespace SistemaPonto.Domain.Entities {
    public class Colaborador : Usuario {   
        public Setor Setor { get; set; }    
        public List<Horario> Horarios { get; set; } 
        public byte[] Imagem { get; set; }
    }
}