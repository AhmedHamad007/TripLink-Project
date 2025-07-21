import { Component } from '@angular/core';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tourist-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './tourist-navbar.component.html',
  styleUrl: './tourist-navbar.component.scss'
})
export class TouristNavbarComponent {
  dropdownOpen = false;
  username = '';

  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.userValue;
    this.username = user?.email || 'Tourist';
  }

  showDropdown() {
    this.dropdownOpen = true;
  }

  hideDropdown() {
    this.dropdownOpen = false;
  }

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
