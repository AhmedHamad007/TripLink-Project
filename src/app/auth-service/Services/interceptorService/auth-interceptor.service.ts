import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../NotificationService/notification-service.service';
import { AuthService } from '../Auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const serviceId = 'auth-interceptor-' + Date.now();
  const router = inject(Router);
  const notificationService = inject(NotificationServiceService);
  const authService = inject(AuthService);

  const token = localStorage.getItem('jwt');
  let clonedReq = req;

  // Skip logging for login/register requests as they don't need tokens
  const isAuthRequest = req.url.includes('/api/Account/login') || req.url.includes('/api/Account/register');
  
  // Always add Authorization header if token exists
  if (token) {
    clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    if (!isAuthRequest) {
      console.log(`[${serviceId}] Added Authorization header to request: ${req.url}`);
    }
  } else if (isAuthRequest) {
    console.log(`[${serviceId}] No token available for request: ${req.url}`);
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error(`[${serviceId}] 401 Error: Invalid or expired token`);
        // notificationService.show('Your session has expired, please log in again');
        // authService.clearUserData();
        // router.navigate(['/login']);
      } else if (error.status === 403) {
        console.error(`[${serviceId}] 403 Error: Unauthorized access to: ${req.url}`);
        notificationService.show('You are not authorized to access this resource');
        authService.redirectToDashboard(authService.userValue?.role || '');
      }
      return throwError(() => error);
    })
  );
};