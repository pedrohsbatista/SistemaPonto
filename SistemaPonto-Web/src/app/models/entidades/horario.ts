import { DiaSemana } from '../enums/dia-semana.enum';
import { EntidadeBase } from './entidade-base';

export interface Horario extends EntidadeBase {
    diaSemana  : DiaSemana
    inicio : Date
    fim : Date
}
