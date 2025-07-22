import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth-service/Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-navbar',
  imports: [RouterModule],
  templateUrl: './hotel-navbar.component.html',
  styleUrl: './hotel-navbar.component.scss'
})
export class HotelNavbarComponent {
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
