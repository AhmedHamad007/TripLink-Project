import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthProfileNavbarComponent } from '../shared-auth-clients/auth-profile-navbar/auth-profile-navbar.component';

@Component({
  selector: 'app-auth-client-bookings',
  imports: [CommonModule,RouterLink, AuthProfileNavbarComponent],
  templateUrl: './auth-client-bookings.component.html',
  styleUrl: './auth-client-bookings.component.scss'
})
export class AuthClientBookingsComponent {

}

