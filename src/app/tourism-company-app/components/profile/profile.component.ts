import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TourismCompanyNavbarComponent } from '../tourism-company-navbar/tourism-company-navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, TourismCompanyNavbarComponent],
  template: `
    <app-tourism-company-navbar></app-tourism-company-navbar>
    <div class="container mt-5">
      <h2>Company Profile</h2>
      <div *ngIf="user">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <!-- Add more company profile fields here -->
        <form (ngSubmit)="onSubmit()">
          <!-- Example fields -->
          <div class="mb-3">
            <label for="companyName" class="form-label">Company Name</label>
            <input type="text" id="companyName" class="form-control" [(ngModel)]="companyName" name="companyName">
          </div>
          <button type="submit" class="btn btn-primary">Update Profile</button>
        </form>
      </div>
      <div *ngIf="!user">
        <p>Please log in to view your profile.</p>
      </div>
    </div>
  `,
  styles: [``]
})
export class ProfileComponent implements OnInit {
  user: any;
  companyName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.userValue;
    // Optionally fetch company profile info here
  }

  onSubmit() {
    // TODO: Implement profile update logic
    alert('Profile update not implemented yet.');
  }
} 