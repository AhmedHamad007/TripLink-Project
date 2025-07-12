import { Component } from '@angular/core';
import { Booking } from './booking';
import { TourismCompanyNavbarComponent } from '../tourism-company-navbar/tourism-company-navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TourismCompanyNavbarComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  name: string = "Aisha";

  bookings: Array<Booking> = [
    {
      id: 12345,
      name: "Pyramids & Nile Cruise",
      customer: "Omar Hassan",
      date: "2024-07-20",
      status: "Confirmed"
    },
    {
      id: 12346,
      name: "Red Sea Diving Adventure",
      customer: "Fatima Ali",
      date: "2024-07-22",
      status: "Pending"
    },
    {
      id: 12347,
      name: "Cairo City Tour",
      customer: "Ahmed Khaled",
      date: "2024-07-18",
      status: "Completed"
    },
    {
      id: 12348,
      name: "Luxor Temples Exploration",
      customer: "Layla Ibrahim",
      date: "2024-07-25",
      status: "Confirmed"
    },
    {
      id: 12349,
      name: "Desert Safari",
      customer: "Youssef Mahmoud",
      date: "2024-07-28",
      status: "Pending"
    },
  ]
}
