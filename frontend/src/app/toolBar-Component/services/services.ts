import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialDesignModule } from '../../material-design/material-design/material-design-module';


@Component({
  selector: 'app-services',
  imports: [MaterialDesignModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesPage {}