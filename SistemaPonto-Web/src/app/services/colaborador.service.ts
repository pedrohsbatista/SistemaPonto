import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../utilities/global-constants';
import { GenericService } from './generic.service';
import { Colaborador } from '../models/entidades/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends GenericService<Colaborador> {

  constructor(protected _http: HttpClient) {
    super(_http, GlobalConstants.apiUrl + 'colaborador/');
  }
}
