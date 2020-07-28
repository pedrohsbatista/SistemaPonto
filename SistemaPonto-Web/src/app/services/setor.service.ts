import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App } from '../utilities/app';
import { Setor } from '../models/entidades/setor';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class SetorService extends GenericService<Setor>{

  constructor(protected _http: HttpClient) {
    super(_http, App.apiUrl + 'setor/');
  }

}