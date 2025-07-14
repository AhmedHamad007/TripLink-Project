import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { NavbarComponent } from '../../../shared-app/Components/navbar/navbar.component';

@Component({
  selector: 'app-tourism-company-dashboard',
  imports: [RouterModule , CommonModule , FormsModule ],
  templateUrl: './tourism-company-dashboard.component.html',
  styleUrl: './tourism-company-dashboard.component.scss'
})
export class TourismCompanyDashboardComponent {
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
