import { EntidadeBase } from './entidade-base';
import { Colaborador } from './colaborador';
import { TipoMovimentacao } from '../enums/tipo-movimentacao.enum';

export interface Movimentacao  extends EntidadeBase {
     colaborador : Colaborador
     dataMovimentacao : Movimentacao
     tipoMovimentacao : TipoMovimentacao
}
