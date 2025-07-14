import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared-app/Components/navbar/navbar.component";
import { AuthService } from '../../Services/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-tourism-company',
  imports: [NavbarComponent , FormsModule , CommonModule , RouterModule],
  templateUrl: './register-tourism-company.component.html',
  styleUrl: './register-tourism-company.component.scss'
})
export class RegisterTourismCompanyComponent {
 tourismCompanyData = {
    name: '',
    email: '',
    password: '',
    license: '',
    address: '',
    description: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log('Form submitted:', this.tourismCompanyData);
    if (form.valid) {
      this.authService.registerTourismCompany(this.tourismCompanyData).subscribe({
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
