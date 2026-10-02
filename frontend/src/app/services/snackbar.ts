import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {

  constructor(private snackBar: MatSnackBar){}

  success(message:string){
    this.snackBar.open(message,'Close',{
      duration:3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  error(message:string){
    this.snackBar.open(message,'Close',{
      duration:3000,
      panelClass: ['error-snackbar'],
      horizontalPosition:'center',
      verticalPosition: 'top'
    });
  }

  info(message: string){
    this.snackBar.open(message,'Close',{
      duration:3000
    });
  }
}
