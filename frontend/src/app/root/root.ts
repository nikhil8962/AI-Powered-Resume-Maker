import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MaterialDesignModule } from '../material-design/material-design/material-design-module';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MaterialDesignModule],
  templateUrl: './root.html',
  styleUrl: './root.css',
})
export class Root {}