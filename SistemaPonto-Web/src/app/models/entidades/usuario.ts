import { EntidadeBase } from './entidade-base';

export interface Usuario extends EntidadeBase {
    nome : string
    email : string
    senha : string
}
