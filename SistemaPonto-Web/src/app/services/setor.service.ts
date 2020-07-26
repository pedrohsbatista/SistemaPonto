import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../utilities/global-constants'
import { Setor } from '../models/setor';
import { Guid } from 'guid-typescript';


@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  get() : Observable<Setor[]> {
     return this.httpClient.get<Setor[]>(GlobalConstants.apiUrl + 'setor');
  };  

  save(setor: Setor) : Observable<Setor> {
    if (setor.id) {
      return this.httpClient.put<Setor>(GlobalConstants.apiUrl + 'setor', JSON.stringify(setor), this.httpOptions);
    }  else{
      return this.httpClient.post<Setor>(GlobalConstants.apiUrl + 'setor', JSON.stringify(setor), this.httpOptions);
    }  
  }

  delete(id: Guid) {
    return this.httpClient.delete<Setor>(GlobalConstants.apiUrl + 'setor/' + id, this.httpOptions)
  }  

  getById(id: Guid) : Observable<Setor> {
    return this.httpClient.get<Setor>(GlobalConstants.apiUrl + 'setor/' + id, this.httpOptions)
  }   
}