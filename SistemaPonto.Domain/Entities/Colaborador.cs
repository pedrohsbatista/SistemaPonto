using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaPonto.Domain.Entities {
    public class Colaborador : Usuario {     
        [Column("datanascimento")]
        public DateTime? DataNascimento { get; set; }

        [MaxLength(11, ErrorMessage="O campo CPF dever ter no máximo 11 caracteres")]  
        [Column("cpf")]
        public string Cpf { get; set; }   

        [Column("imagem")]
        public byte[] Imagem { get; set; }

        [Required(ErrorMessage="O campo setor é obrigatório")]
        [Column("setorid")]
        public Setor Setor { get; set; }   

        [Required(ErrorMessage="O campo cargo é obrigatório")]
        [MaxLength(100, ErrorMessage="O campo cargo deve ter no máximo 100 caracteres")]
        [Column("cargo")]
        public string Cargo { get; set; } 

        public List<Horario> Horarios { get; set; } 

        [MaxLength(100, ErrorMessage="O campo logradouro deve ter no máximo 100 caracteres")]  
        [Column("logradouro")]        
        public string Logradouro  { get; set; }

        [Column("numerologradouro")]
        [MaxLength(10, ErrorMessage="O campo número do logradouro dever ter no máximo 10 caracteres")] 
        public string NumeroLogradouro { get; set; }  

        [MaxLength(100, ErrorMessage="O campo bairro deve ter no máximo 100 caracteres")]  
        [Column("bairro")] 
        public string Bairro { get; set; }

        [MaxLength(100, ErrorMessage="O campo município deve ter no máximo 100 caracteres")]
        [Column("municipio")]
        public string Municipio { get; set; }

        [MaxLength(2, ErrorMessage="O campo UF deve ter no máximo 2 caracteres")]
        [Column("uf")]
        public string Uf { get; set; }

        [MaxLength(8, ErrorMessage="O campo CEP deve ter no máximo 8 caracteres")]
        [Column("cep")]
        public string Cep { get; set; }

        [MaxLength(100, ErrorMessage="O campo complemento deve ter no máximo 100 caracteres")]
        [Column("complemento")]
        public string Complemento { get; set; }

        [MaxLength(100, ErrorMessage="O campo email deve ter no máximo 100 caracteres")]
        [Column("email")]
        public string Email { get; set; }

        [MaxLength(10, ErrorMessage="O campo telefone deve ter no máximo 10 caracteres")]
        [Column("telefone")]
        public string Telefone { get; set; }
        
        [MaxLength(11, ErrorMessage="O campo celular deve ter no máximo 11 caracteres")]
        [Column("celular")]
        public string Celular { get; set; }
    }
}