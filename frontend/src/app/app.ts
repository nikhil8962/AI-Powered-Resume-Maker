import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialDesignModule } from './material-design/material-design/material-design-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MaterialDesignModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AI-RESUME-MAKER');
}
