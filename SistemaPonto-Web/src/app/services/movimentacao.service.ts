import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App } from '../utilities/app';
import { GenericService } from './generic.service';
import { Movimentacao } from '../models/entidades/movimentacao';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService extends GenericService<Movimentacao> {

  constructor(protected _http: HttpClient) {
    super(_http, App.apiUrl + 'movimentacao/');
  }

}
