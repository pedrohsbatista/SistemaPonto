import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../utilities/global-constants';
import { GenericService } from './generic.service';
import { Movimentacao } from '../models/entidades/movimentacao';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService extends GenericService<Movimentacao> {

  constructor(protected _http: HttpClient) {
    super(_http, GlobalConstants.apiUrl + 'movimentacao/');
  }

}
