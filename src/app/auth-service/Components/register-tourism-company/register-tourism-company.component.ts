import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared-app/Components/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TourismCompanyRegisterationService } from '../../Services/TourismCompanyRegisteration/tourism-company-registeration.service';
import { NotificationServiceService } from '../../Services/NotificationService/notification-service.service';
import { IRegisterTourismCompanyData } from '../../Interfaces/iregister-tourism-company-data';

@Component({
  selector: 'app-register-tourism-company',
  imports: [RouterModule, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './register-tourism-company.component.html',
  styleUrl: './register-tourism-company.component.scss'
})
export class RegisterTourismCompanyComponent {
  companyData: IRegisterTourismCompanyData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    companyName: '',
    licenseNumber: '',
    description: '',
    contactEmail: '',
    contactPhone: ''
  };
  isLoading = false;
  errors = {
    email: '',
    password: ''
  };

  constructor(
    private tourismCompanyRegisterationService: TourismCompanyRegisterationService,
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
    this.tourismCompanyRegisterationService.registerTourismCompany(this.companyData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.show('Tourism company registered successfully!');
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
