import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Booking } from '../interfaces/booking';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-bookings',
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.scss',
  standalone: true,
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
