import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../../shared-app/Components/navbar/navbar.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TourPackage } from '../interfaces/tour-package';
import { TourPackageService } from '../Services/tour-package.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-package-booking',
  imports: [CommonModule,ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './package-booking.component.html',
  styleUrl: './package-booking.component.scss'
})
export class PackageBookingComponent implements OnInit {
  package: TourPackage | null = null;
  bookingForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  packageId: string | null = null;
  bookingDate: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private tourPackageService: TourPackageService,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      touristEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.packageId = this.route.snapshot.paramMap.get('packageId');
    if (this.packageId) {
      this.loadPackageDetails(this.packageId);
    } else {
      this.errorMessage = 'Invalid package ID.';
    }
  }

  loadPackageDetails(packageId: string): void {
    this.tourPackageService.getPackageById(packageId).subscribe({
      next: (pkg) => {
        this.package = pkg;
        // Set booking date to one day after start date
        this.bookingDate = new Date(pkg.startDate);
        this.bookingDate.setDate(this.bookingDate.getDate() + 1);
      },
      error: (err) => {
        console.error('Error fetching package details:', err.message);
        this.errorMessage = 'Failed to load package details.';
      }
    });
  }

  onSubmit(): void {
    if (this.bookingForm.invalid || !this.package || !this.packageId || !this.bookingDate) {
      this.errorMessage = 'Please fill out all required fields correctly or ensure a valid package is selected.';
      return;
    }

    const bookingData = {
      touristEmail: this.bookingForm.get('touristEmail')?.value,
      packageId: this.packageId,
      bookingDate: this.bookingDate.toISOString(),
      totalPrice: this.package.price
    };

    console.log('Booking payload:', bookingData);

    this.tourPackageService.bookPackage(bookingData).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Booking created successfully!';
        this.errorMessage = null;
        this.bookingForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error submitting booking:', err.message, err.error);
        const serverMessage = err.error?.message || err.error?.title || err.message || 'Failed to create booking. Please try again.';
        this.errorMessage = serverMessage;
        this.successMessage = null;
      }
    });
  }
}