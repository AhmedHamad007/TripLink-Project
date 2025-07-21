import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthProfileNavbarComponent } from '../shared-auth-clients/auth-profile-navbar/auth-profile-navbar.component';

@Component({
  selector: 'app-auth-client-dashboard',
  imports: [CommonModule ],
  templateUrl: './auth-client-dashboard.component.html',
  styleUrl: './auth-client-dashboard.component.scss'
})
export class AuthClientDashboardComponent {

}
