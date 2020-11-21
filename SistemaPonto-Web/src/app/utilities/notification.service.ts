import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { 
  }

  openSnackBarDanger(message, action = '', horizontalPosition : MatSnackBarHorizontalPosition = 'center' , verticalPosition : MatSnackBarVerticalPosition = 'bottom', duration = 5000) {
    this.openSnackBar(message, 'notification-danger', action, horizontalPosition, verticalPosition, duration);
  }

  openSnackBarSuccess(message, action = '', horizontalPosition : MatSnackBarHorizontalPosition = 'center' , verticalPosition : MatSnackBarVerticalPosition = 'bottom', duration = 5000) {
    this.openSnackBar(message, 'notification-success', action, horizontalPosition, verticalPosition, duration);
  }

  private openSnackBar(message, color, action = '', horizontalPosition : MatSnackBarHorizontalPosition = 'center' , verticalPosition : MatSnackBarVerticalPosition = 'bottom', duration = 5000) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: [color]
    });
  }
}
