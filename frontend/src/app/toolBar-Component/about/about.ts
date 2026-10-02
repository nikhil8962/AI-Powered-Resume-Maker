import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialDesignModule } from '../../material-design/material-design/material-design-module';


@Component({
  selector: 'app-about',
  imports: [MaterialDesignModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}