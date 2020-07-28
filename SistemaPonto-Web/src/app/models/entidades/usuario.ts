import { EntidadeBase } from './entidade-base';

export interface Usuario extends EntidadeBase {
    nome : string
    login : string
    senha : string
}
