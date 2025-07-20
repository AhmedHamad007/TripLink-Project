import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Iuser } from '../../../auth-service/Interfaces/iuser';
import { TouristNavbarComponent } from '../tourist-navbar/tourist-navbar.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tourist-dashboard',
  imports: [RouterModule, CommonModule, TouristNavbarComponent, FormsModule],
  templateUrl: './tourist-dashboard.component.html',
  styleUrl: './tourist-dashboard.component.scss'
})
export class TouristDashboardComponent implements OnInit {
  user: Iuser | null = null;
  photos: string[] = [];
  highRatedTrips: Trip[] = [];
  allPackages: Trip[] = [];
  bookingTrip: Trip | null = null;
  bookingInProgress = false;
  bookingSuccess: string | null = null;
  bookingError: string | null = null;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.user = this.authService.userValue;
    if (!this.user || this.user.role !== 'Tourist') {
      this.router.navigate(['/login']);
    }
    // Fetch all packages and high-rated trips
    this.http.get<Trip[]>('/api/TourPackages').subscribe({
      next: (trips) => {
        this.allPackages = trips;
        this.highRatedTrips = [...trips]
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          .slice(0, 3);
      }
    });
  }

  bookTrip(trip: Trip) {
    this.bookingTrip = trip;
    this.bookingSuccess = null;
    this.bookingError = null;
  }

  submitTripBooking(form: { bookingDate: string }) {
    if (!this.bookingTrip) return;
    const user = this.user;
    if (!user) {
      this.bookingError = 'You must be logged in to book.';
      return;
    }
    this.bookingInProgress = true;
    const booking: CreatePackageBookingDto = {
      touristEmail: user.email,
      packageID: this.bookingTrip.packageId,
      bookingDate: form.bookingDate,
      totalPrice: this.bookingTrip.price
    };
    this.http.post('/api/Bookings/package', booking).subscribe({
      next: () => {
        this.bookingSuccess = 'Trip booking successful!';
        this.bookingInProgress = false;
        this.bookingTrip = null;
      },
      error: () => {
        this.bookingError = 'Booking failed. Please try again.';
        this.bookingInProgress = false;
      }
    });
  }

  cancelTripBooking() {
    this.bookingTrip = null;
    this.bookingSuccess = null;
    this.bookingError = null;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        alert('Logout failed. Please try again.');
      }
    });
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}

export interface Trip {
  packageId: string;
  packageName: string;
  description: string;
  price: number;
  durationDays: number;
  startDate: string;
  endDate: string;
  rating?: number;
  photoUrls?: string[];
}

export interface CreatePackageBookingDto {
  touristEmail: string;
  packageID: string;
  bookingDate: string;
  totalPrice: number;
}
