import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth-service/Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-guide-navbar',
  imports: [RouterModule],
  templateUrl: './tour-guide-navbar.component.html',
  styleUrl: './tour-guide-navbar.component.scss'
})
export class TourGuideNavbarComponent {
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
