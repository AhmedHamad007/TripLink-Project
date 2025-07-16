import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared-app/Components/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelRegisterationService } from '../../Services/HotelRegisteration/hotel-registeration.service';
import { NotificationServiceService } from '../../Services/NotificationService/notification-service.service';
import { IRegisterHotelData } from '../../Interfaces/iregister-hotel-data';

@Component({
  selector: 'app-register-hotel',
  imports: [RouterModule, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './register-hotel.component.html',
  styleUrl: './register-hotel.component.scss'
})
export class RegisterHotelComponent {
  hotelData: IRegisterHotelData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    hotelName: '',
    hotelAddress: '',
    description: '',
    rating: 1,
    contactEmail: '',
    contactPhone: ''
  };
  isLoading = false;
  errors = {
    email: '',
    password: '',
    rating: ''
  };

  constructor(
    private hotelRegisterationService: HotelRegisterationService,
    private notificationService: NotificationServiceService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    this.errors = { email: '', password: '', rating: '' };
    if (!form.valid) {
      this.notificationService.show('Please fill out all required fields correctly.');
      return;
    }
    this.isLoading = true;
    this.hotelRegisterationService.registerHotel(this.hotelData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.show('Hotel registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || err.message || 'Registration failed. Please try again.';
        this.notificationService.show(errorMessage);
        this.errors.email = errorMessage.includes('email') ? errorMessage : '';
        this.errors.password = errorMessage.includes('password') ? errorMessage : '';
        this.errors.rating = errorMessage.includes('rating') ? errorMessage : '';
      }
    });
  }
}
