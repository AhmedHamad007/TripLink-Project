import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourism-company-navbar',
  imports: [RouterModule],
  templateUrl: './tourism-company-navbar.component.html',
  styleUrl: './tourism-company-navbar.component.scss'
})
export class TourismCompanyNavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Logout failed. Please try again.');
      }
    });
  }
}
