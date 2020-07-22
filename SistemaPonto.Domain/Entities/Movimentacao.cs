using System;
using SistemaPonto.Domain.Enums;

namespace SistemaPonto.Domain.Entities {
    public class Movimentacao : EntidadeBase {
        public Colaborador Colaborador  { get; set; }
        public DateTime DataMovimentacao  { get; set; }
        public TipoMovimentacao TipoMovimentacao { get; set; }
    }
}