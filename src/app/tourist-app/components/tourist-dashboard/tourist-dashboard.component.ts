import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Iuser } from '../../../auth-service/Interfaces/iuser';

@Component({
  selector: 'app-tourist-dashboard',
  imports: [RouterModule , CommonModule],
  templateUrl: './tourist-dashboard.component.html',
  styleUrl: './tourist-dashboard.component.scss'
})
export class TouristDashboardComponent implements OnInit {
user: Iuser | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.userValue;
    if (!this.user || this.user.role !== 'Tourist') {
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
