import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { App } from '../utilities/app';
import { GenericService } from './generic.service';
import { Movimentacao } from '../models/entidades/movimentacao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService extends GenericService<Movimentacao> {

  constructor(protected http: HttpClient) {
    super(http, App.apiUrl + 'movimentacao/');
  }

  postMovimentacao(imagem: string) : Observable<Movimentacao> {
    var dados = {
      imagem: imagem
    };
    return this.http.post<Movimentacao>(this._base + 'PostMovimentacao', JSON.stringify(dados),  { headers: new HttpHeaders({'Content-Type': 'application/json' })});
  }
}
