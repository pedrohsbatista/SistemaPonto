using System;
using SistemaPonto.Domain.Enums;

namespace SistemaPonto.Domain.Entities {
    public class Horario : EntidadeBase {
        public DiaSemana DiaSemana { get; set; }
        public TimeSpan Inicio { get; set; } 
        public TimeSpan Fim { get; set; } 
    }
}