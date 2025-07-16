import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared-app/Components/navbar/navbar.component';
import { FormsModule , NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Auth/auth.service';
import { NotificationServiceService } from '../../Services/NotificationService/notification-service.service';
import isEmail from 'validator/lib/isEmail';

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
  errors = {
    email: '',
    password: ''
  };
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationServiceService
  ) {}

  onSubmit(form: NgForm) {
    // Reset errors
    this.errors = { email: '', password: '' };

    // Client-side validation
    if (!isEmail(this.loginData.email)) {
      this.errors.email = 'Invalid email address';
      return;
    }
    if (this.loginData.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.show('Login successful!');
        // AuthService.redirectToDashboard is called inside AuthService.login
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed', err);
        const errorMessage = err.error?.message || err.message || 'Login failed. Please try again.';
        this.notificationService.show(errorMessage);
        this.errors.email = errorMessage.includes('email') ? errorMessage : '';
        this.errors.password = errorMessage.includes('password') ? errorMessage : '';
      }
    });
  }
}
