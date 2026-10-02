import { Component } from '@angular/core';
import { MaterialDesignModule } from '../material-design/material-design/material-design-module';

@Component({
  selector: 'app-home',
  imports: [MaterialDesignModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
