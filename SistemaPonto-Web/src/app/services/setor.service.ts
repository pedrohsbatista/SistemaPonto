import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../utilities/global-constants'
import { Setor } from '../models/entidades/setor';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class SetorService extends GenericService<Setor>{

  constructor(protected _http: HttpClient) {
    super(_http, GlobalConstants.apiUrl + 'setor/');
  }

}