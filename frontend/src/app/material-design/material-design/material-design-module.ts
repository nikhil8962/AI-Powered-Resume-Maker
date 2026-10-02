import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatToolbarModule,MatIconModule,MatButtonModule,MatCardModule,MatInputModule,MatSnackBarModule,MatProgressSpinnerModule,MatDividerModule,MatChipsModule]
})
export class MaterialDesignModule {}
