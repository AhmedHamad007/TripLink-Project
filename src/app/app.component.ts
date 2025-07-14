import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ClientAppModule } from './client-app/client-app.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,  ClientAppModule  , RouterModule , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TripLink';
}
