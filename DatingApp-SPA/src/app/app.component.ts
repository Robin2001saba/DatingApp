import { Component } from '@angular/core';
import { ValueComponent } from './value/value.component';  // Make sure this is correct
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // Make sure this is set correctly for standalone component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet,ValueComponent]  // Include ValueComponent here if using standalone component
})
export class AppComponent {
  title = 'DatingApp-SPA';
}
