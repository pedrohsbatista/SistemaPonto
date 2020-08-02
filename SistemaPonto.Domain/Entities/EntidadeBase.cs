using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaPonto.Domain.Entities {
    public class EntidadeBase {
        [Column("id")]
        public Guid? Id { get; set;}
    }
}