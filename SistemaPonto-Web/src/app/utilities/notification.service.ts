import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { 
  }

  openSnackBar(message, action = '', horizontalPosition : MatSnackBarHorizontalPosition = 'center' , verticalPosition : MatSnackBarVerticalPosition = 'bottom', duration = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition 
    });
  }
}
