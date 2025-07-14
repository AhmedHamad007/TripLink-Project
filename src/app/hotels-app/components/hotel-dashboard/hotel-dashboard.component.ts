import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';

@Component({
  selector: 'app-hotel-dashboard',
  imports: [RouterModule , CommonModule ],
  templateUrl: './hotel-dashboard.component.html',
  styleUrl: './hotel-dashboard.component.scss'
})
export class HotelDashboardComponent {
 user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.userValue;
    if (!this.user) {
      this.router.navigate(['/login']);
    }
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
}
