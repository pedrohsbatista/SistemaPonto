import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../utilities/global-constants';
import { Administrativo } from '../models/entidades/administrativo';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService extends GenericService<Administrativo> {
  constructor(protected _http: HttpClient) {
    super(_http, GlobalConstants.apiUrl + 'administrativo/');
  }
}
