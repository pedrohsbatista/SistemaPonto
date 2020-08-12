import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CameraComponent>) {    
  } 

  @Output()
  pictureTaken = new EventEmitter<WebcamImage>();
  
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  videoOptions: MediaTrackConstraints;  
  errors: WebcamInitError[] = [];
  trigger: Subject<void> = new Subject<void>();
  capturedImage: string;

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  toggleWebcam() : void {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) : void {
    console.log(error);
  }

  handleImage(webcamImage: WebcamImage) : void {
    this.capturedImage = webcamImage.imageAsDataUrl;
    this.pictureTaken.emit(webcamImage);
  }
   
  get triggerObservable() : Observable<void> {
    return this.trigger.asObservable();
  }

  cancelar(){
    this.dialogRef.close();
  }

  tirarFoto(){
    this.trigger.next();
  } 

  apagarImagemCapturada(){
    this.capturedImage = null;
  }
}
