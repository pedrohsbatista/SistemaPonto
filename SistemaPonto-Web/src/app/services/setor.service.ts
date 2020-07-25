import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../utilities/global-constants'
import { Setor } from '../models/setor';


@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll() : Observable<Setor[]> {
     return this.httpClient.get<Setor[]>(GlobalConstants.apiUrl + 'setor');
  };  
}