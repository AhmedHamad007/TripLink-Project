import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ClientAppModule } from './client-app/client-app.module';
import { SharedAppModule } from './shared-app/shared-app.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,  ClientAppModule , SharedAppModule , RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TripLink';
}
