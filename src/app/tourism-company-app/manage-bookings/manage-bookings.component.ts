import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TourismCompanyNavbarComponent } from '../tourism-company-navbar/tourism-company-navbar.component';
import { CompanyService } from '../services/company.service';
import { Booking } from '../interfaces/booking';
import { Observable, Subscription } from 'rxjs';
import { log } from 'console';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-bookings',
  imports: [RouterModule],
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.scss'
})
export class ManageBookingsComponent implements OnInit {


  bookingService = inject(CompanyService);

  bookings: Booking[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookingService.bookings$.subscribe({
      next: (val) => {
        this.bookings = val;
      },
      error: (err) => {
        alert(err);
      }
    })
  }
}
