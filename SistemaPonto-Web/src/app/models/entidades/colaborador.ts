import { Usuario } from './usuario';
import { Setor } from './setor';
import { Horario } from './horario';

export interface Colaborador extends Usuario {
   setor : Setor    
   horarios : Array<Horario>
   imagem : ArrayBuffer
}
