import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared-app/Components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-register-tourist',
  imports: [NavbarComponent , CommonModule , FormsModule , RouterModule],
  templateUrl: './register-tourist.component.html',
  styleUrl: './register-tourist.component.scss'
})
export class RegisterTouristComponent {
 touristData = {
    name: '',
    email: '',
    password: '',
    nationality: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log('Form submitted:', this.touristData);
    if (form.valid) {
      this.authService.registerTourist(this.touristData).subscribe({
        next: (response) => {
          console.log('Registration response:', response);
          if (response.message === 'Registration successful') {
            this.router.navigate(['/login']);
          } else {
            alert('Unexpected response from server. Please try again.');
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
          alert('Registration failed: ' + (err.message || 'Unknown error'));
        }
      });
    } else {
      console.log('Form is invalid:', form.errors);
      alert('Please fill out all required fields correctly.');
    }
  }
}
