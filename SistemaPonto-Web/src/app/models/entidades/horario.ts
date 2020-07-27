import { DiaSemana } from '../enums/dia-semana.enum';

export interface Horario {
    diaSemana  : DiaSemana
    inicio : Date
    fim : Date
}
