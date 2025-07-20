import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthProfileNavbarComponent } from '../shared-auth-clients/auth-profile-navbar/auth-profile-navbar.component';

@Component({
  selector: 'app-auth-client-edit-profile',
  imports: [CommonModule, FormsModule, AuthProfileNavbarComponent],
  templateUrl: './auth-client-edit-profile.component.html',
  styleUrl: './auth-client-edit-profile.component.scss'
})
export class AuthClientEditProfileComponent {

}

