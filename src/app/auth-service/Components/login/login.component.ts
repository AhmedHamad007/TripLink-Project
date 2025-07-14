import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared-app/Components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule , NavbarComponent , FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        if (response.success) {
          // The AuthService's login method already handles redirection via redirectToDashboard
          // No need to navigate here since redirectToDashboard is called in AuthService
        } else {
          alert(response.message);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Please try again.');
      }
    });
  }
}
