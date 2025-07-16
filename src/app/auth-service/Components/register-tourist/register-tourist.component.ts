import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared-app/Components/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TouristRegisterationService } from '../../Services/TouristRegisteration/tourist-registeration.service';
import { NotificationServiceService } from '../../Services/NotificationService/notification-service.service';
import { IRegisterTouristData } from '../../Interfaces/iregister-tourist-data';

@Component({
  selector: 'app-register-tourist',
  imports: [RouterModule, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './register-tourist.component.html',
  styleUrl: './register-tourist.component.scss'
})
export class RegisterTouristComponent {
  touristData: IRegisterTouristData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    preferences: '',
    favoriteDestinations: ''
  };
  isLoading = false;
  errors = {
    email: '',
    password: ''
  };

  constructor(
    private touristRegisterationService: TouristRegisterationService,
    private notificationService: NotificationServiceService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    this.errors = { email: '', password: '' };
    if (!form.valid) {
      this.notificationService.show('Please fill out all required fields correctly.');
      return;
    }
    this.isLoading = true;
    this.touristRegisterationService.registerTourist(this.touristData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.show('Tourist registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || err.message || 'Registration failed. Please try again.';
        this.notificationService.show(errorMessage);
        this.errors.email = errorMessage.includes('email') ? errorMessage : '';
        this.errors.password = errorMessage.includes('password') ? errorMessage : '';
      }
    });
  }
}
