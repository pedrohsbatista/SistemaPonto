import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { App } from '../utilities/app';
import { Administrativo } from '../models/entidades/administrativo';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService extends GenericService<Administrativo> {
  constructor(protected _http: HttpClient) {
    super(_http, App.apiUrl + 'administrativo/');
  }
}
