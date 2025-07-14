import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared-app/Components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-tourist-guide',
  imports: [NavbarComponent , CommonModule , RouterModule , FormsModule ],
  templateUrl: './register-tourist-guide.component.html',
  styleUrl: './register-tourist-guide.component.scss'
})
export class RegisterTouristGuideComponent {
tourGuideData = {
    name: '',
    email: '',
    password: '',
    specialty: '',
    languages: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log('Form submitted:', this.tourGuideData);
    if (form.valid) {
      this.authService.registerTouristGuide(this.tourGuideData).subscribe({
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

