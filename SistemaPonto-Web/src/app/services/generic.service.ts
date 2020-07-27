import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(private httpClient: HttpClient, protected _base: string)  { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  get() : Observable<T[]> {
     return this.httpClient.get<T[]>(this._base);
  };  

  post(dados: T) : Observable<T> {
      return this.httpClient.post<T>(this._base, JSON.stringify(dados), this.httpOptions);
  }

  put(dados: T) : Observable<T> {
      return this.httpClient.put<T>(this._base, JSON.stringify(dados), this.httpOptions);
  }

  delete(id: Guid) {
    return this.httpClient.delete<T>(this._base + id, this.httpOptions)
  }  

  getById(id: Guid) : Observable<T> {
    return this.httpClient.get<T>(this._base + id, this.httpOptions)
  }
}
