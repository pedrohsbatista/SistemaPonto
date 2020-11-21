import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamComponent, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.css']
})
export class CapturaComponent implements OnInit {
  
  trigger: Subject<void> = new Subject<void>();

  constructor(private movimentacaoService : MovimentacaoService, private notification : NotificationService) { }

  ngOnInit(): void {
  }

  handleInitError(error: WebcamInitError) : void{
    console.log(error);
  }

  handleImage(webcamImage: WebcamImage) : void {
    this.postMovimentacao(webcamImage.imageAsBase64);
  }

  get triggerObservable() : Observable<void>{
    return this.trigger.asObservable();
  }

  tirarFoto(){
    this.trigger.next();
  }
  
  postMovimentacao(imagem: string)  {
     this.movimentacaoService.postMovimentacao(imagem).subscribe((success) => {
        this.notification.openSnackBarSuccess(success);
     }, (response) => {
       this.notification.openSnackBarDanger(response.error);
     })
  }
}
