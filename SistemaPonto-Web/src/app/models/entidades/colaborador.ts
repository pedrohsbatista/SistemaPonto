import { Usuario } from './usuario';
import { Setor } from './setor';
import { Horario } from './horario';
import { Guid } from 'guid-typescript';

export interface Colaborador extends Usuario {
   dataNascimento : Date,
   cpf: string,
   imagem : string,
   setor : Setor,
   cargo: string,    
   horarios : Array<Horario>,
   logradouro: string,
   numeroLogradouro: string,
   bairro: string,
   municipio: string,
   uf: string,
   cep: string,
   complemento: string,
   email: string,
   telefone: string,
   celular: string,
   personId: Guid,
   persistedFaceId: Guid
}
