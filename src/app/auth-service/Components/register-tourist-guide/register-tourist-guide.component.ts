import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared-app/Components/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TouristGuideRegesterationService } from '../../Services/TouristGuideRegesteration/tourist-guide-regesteration.service';
import { NotificationServiceService } from '../../Services/NotificationService/notification-service.service';
import { IRegisterTourGuideData } from '../../Interfaces/iregister-tour-guide-data';

@Component({
  selector: 'app-register-tourist-guide',
  imports: [RouterModule, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './register-tourist-guide.component.html',
  styleUrl: './register-tourist-guide.component.scss'
})
export class RegisterTouristGuideComponent {
  guideData: IRegisterTourGuideData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    guideName: '',
    licenseNumber: '',
    languages: [],
    areasCovered: '',
    pricePerHour: 0,
    contactEmail: '',
    contactPhone: ''
  };
  isLoading = false;
  errors = {
    email: '',
    password: '',
    pricePerHour: ''
  };

  constructor(
    private touristGuideRegesterationService: TouristGuideRegesterationService,
    private notificationService: NotificationServiceService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    this.errors = { email: '', password: '', pricePerHour: '' };
    if (!form.valid) {
      this.notificationService.show('Please fill out all required fields correctly.');
      return;
    }
    this.isLoading = true;
    // Convert comma-separated languages string to array if needed
    if (typeof this.guideData.languages === 'string') {
      this.guideData.languages = (this.guideData.languages as unknown as string).split(',').map(l => l.trim()).filter(l => l);
    }
    this.touristGuideRegesterationService.registerTouristGuide(this.guideData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.notificationService.show('Tourist guide registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || err.message || 'Registration failed. Please try again.';
        this.notificationService.show(errorMessage);
        this.errors.email = errorMessage.includes('email') ? errorMessage : '';
        this.errors.password = errorMessage.includes('password') ? errorMessage : '';
        this.errors.pricePerHour = errorMessage.includes('price') ? errorMessage : '';
      }
    });
  }
}

