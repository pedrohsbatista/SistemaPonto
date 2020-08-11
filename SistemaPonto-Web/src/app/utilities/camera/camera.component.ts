import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor() { }
 
  @Output()
  pictureTaken = new EventEmitter<WebcamImage>();
  
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId: string;
  videoOptions: MediaTrackConstraints;
  
  errors: WebcamInitError[] = [];

  trigger: Subject<void> = new Subject<void>();
 
  nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  triggerSnapshot() : void {
     this.trigger.next();
  }

  toggleWebcam() : void {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) : void {
    this.errors.push(error);
  }

  showNextWebcam(directionOrDeviceId: boolean|string) : void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) : void {
      this.pictureTaken.emit(webcamImage);
  }

  cameraWasSwitched(deviceId: string) : void {
     this.deviceId = deviceId;
  }
   
  get triggerObservable() : Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean|string>
  {
    return this.nextWebcam.asObservable();
  }
}
