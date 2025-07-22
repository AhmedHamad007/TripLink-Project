import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { NotificationServiceService } from '../NotificationService/notification-service.service';

export const RedirectToDashboardGuardService: CanActivateFn = (route, state) => {
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