import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { App } from '../utilities/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  login(dados : Object) : Observable<any> {
    return this.httpClient.post(App.apiUrl + 'login', JSON.stringify(dados), this.httpOptions);
  }
}
