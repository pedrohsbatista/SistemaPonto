import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App } from '../utilities/app';
import { GenericService } from './generic.service';
import { Colaborador } from '../models/entidades/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends GenericService<Colaborador> {

  constructor(protected _http: HttpClient) {
    super(_http, App.apiUrl + 'colaborador/');
  }
}
