import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamComponent, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Movimentacao } from 'src/app/models/entidades/movimentacao';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { NotificationService } from 'src/app/utilities/notification.service';
import * as moment from 'moment';
import { TipoMovimentacao } from 'src/app/models/enums/tipo-movimentacao.enum';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css']
})
export class CapturaComponent implements OnInit {
  
  trigger: Subject<void> = new Subject<void>();
  capturedImage: string;

  constructor(private movimentacaoService : MovimentacaoService, private notification : NotificationService) { }

  ngOnInit(): void {
  }

  handleInitError(error: WebcamInitError) : void{
    console.log(error);
  }

  handleImage(webcamImage: WebcamImage) : void {
    this.capturedImage = webcamImage.imageAsBase64;
    this.postMovimentacao(webcamImage.imageAsBase64);
  }

  get triggerObservable() : Observable<void>{
    return this.trigger.asObservable();
  }

  tirarFoto(){
    this.trigger.next();
  }
  
  postMovimentacao(imagem: string)  {
     this.movimentacaoService.postMovimentacao(imagem).subscribe((movimentacao: Movimentacao) => {
      var mensagem = movimentacao.colaborador.nome + " - " + this.enumToLabel(movimentacao.tipoMovimentacao) + " - " + moment(movimentacao.dataMovimentacao).format("DD/MM/YYYY HH:mm");
      this.notification.openSnackBarSuccess(mensagem);
      setTimeout(()=>{                           
        this.capturedImage = undefined;
      }, 5000);       
     }, (response) => {
      this.notification.openSnackBarDanger(response.error);
      setTimeout(()=>{                           
        this.capturedImage = undefined;
      }, 5000);        
     })
  }

  enumToLabel(tipoMovimentacao: TipoMovimentacao){
    switch(tipoMovimentacao){
      case TipoMovimentacao.Entrada: return "Entrada";
      case TipoMovimentacao.Saida: return "Saída";
    }
  } 
}
