import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tour-guide-dashboard',
  imports: [ RouterModule],
  templateUrl: './tour-guide-dashboard.component.html',
  styleUrl: './tour-guide-dashboard.component.scss'
})
export class TourGuideDashboardComponent  implements OnInit{
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
