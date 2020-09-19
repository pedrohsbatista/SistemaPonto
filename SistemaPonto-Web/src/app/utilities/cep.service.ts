import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CepService {
    
   constructor(private httpClient: HttpClient){
   }

   getEndereco(cep: string){
       cep = cep.replace("-", "");
       return this.httpClient.get<Object>("http://viacep.com.br/ws/" + cep + "/json/");
   }

}