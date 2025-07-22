import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotificationServiceService } from '../NotificationService/notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.userValue;
    const expectedRole = (route.data['role'] || '').toLowerCase();

    if (user && user.role && user.role.toLowerCase() === expectedRole) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

export const redirectToDashboardGuard: CanActivateFn = (route, state) => {
  const serviceId = 'redirect-to-dashboard-guard';
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationServiceService);

  const user = authService.userValue;
  if (user && user.token && user.role) {
    console.log(`[${serviceId}] User is logged in: ${user.email}, redirecting to dashboard for role: ${user.role}`);
    authService.redirectToDashboard(user.role);
    return false;
  }

  console.log(`[${serviceId}] No valid user session, allowing access to route: ${state.url}`);
  return true;
};
