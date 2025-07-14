import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../../shared-app/Components/navbar/navbar.component";
import { AuthService } from '../../Services/Auth/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-hotel',
  imports: [RouterModule, NavbarComponent , FormsModule , CommonModule],
  templateUrl: './register-hotel.component.html',
  styleUrl: './register-hotel.component.scss'
})
export class RegisterHotelComponent {
 hotelData = {
    name: '',
    email: '',
    password: '',
    stars: '',
    location: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log('Form submitted:', this.hotelData);
    if (form.valid) {
      this.authService.registerHotel(this.hotelData).subscribe({
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
