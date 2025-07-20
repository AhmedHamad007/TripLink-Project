import { NotificationServiceService } from './../NotificationService/notification-service.service';
import { jwtDecode } from 'jwt-decode';
import { Iuser } from './../../Interfaces/iuser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID,} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';

import isEmail from 'validator/lib/isEmail';


import { UtilsService } from '../Utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = 'http://fizo.runasp.net/api'
  public user : Observable<Iuser | null> ;
  private userSubject : BehaviorSubject<Iuser | null>;
  private readonly serviceId = 'auth-service-' + Date.now();
  private isBrowser: boolean;

    // To use Below
  public saveUserData(userData: Iuser): void {
    if (this.isBrowser) {
      this.userSubject.next(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('jwt', userData.token);
    }
  }

  public clearUserData(): void {
    if (this.isBrowser) {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
    }
    this.userSubject.next(null);
  }
 

  constructor (
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationServiceService,
    private utilsService: UtilsService,
    @Inject(PLATFORM_ID) private platformId: Object
  )
  
  // session Handle
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
    let userData: Iuser | null = null;
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          userData = JSON.parse(storedUser);
          if (userData?.token) {
            const decoded: any = jwtDecode(userData.token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
              throw new Error('Token expired');
            }
          }
          console.log(`[${this.serviceId}]User configured successfully: ${userData?.email}`);
        } catch (e) {
          this.notificationService.show('Not valid session data , pls Login again');
          console.error(`[${this.serviceId}] Faild to analyise the data :`, e); 
          this.clearUserData(),
          this.router.navigate(['/login'])
        }
      }
    }
    this.userSubject = new BehaviorSubject <Iuser | null>(userData)
    this.user = this.userSubject.asObservable();
  }

// get method Handle
  public get userValue() : Iuser | null {
    const user = this.userSubject.value;
    if (!user || !user.token) {
      console.log(`[${this.serviceId}] InValid User`);
      return null ;
    }
    const Decoded : any = jwtDecode (user.token) ;
    const currentTime = Date.now() / 1000;
          if (Decoded.exp < currentTime) {
            console.log (`[${this.serviceId}]  InValid Token`)
            this.clearUserData();
            return null
          }
          console.log(`[${this.serviceId}] Getting user : ${user.email}` )
          return user
  }


/////////////////////////////////////////// login
login(email: string, password: string): Observable<{ success: boolean; user: Iuser; jwt: string }> {
    if (!isEmail(email)) {
      console.error(`[${this.serviceId}] Login failed: Invalid email`);
      return throwError(() => new Error('Invalid email address'));
    }
    if (password.length < 6) {
      console.error(`[${this.serviceId}] Login failed: Password too short`);
      return throwError(() => new Error('Password must be at least 6 characters long'));
    }
    const payload = { email, password };
    return this.http.post<any>('/api/Account/login', payload).pipe(
      map((response: any) => {
        if (!response.token) {
          console.error(`[${this.serviceId}] Login failed: Invalid response (missing token)`);
          throw new Error('Invalid server response: missing token');
        }
        // If user is not present, decode from token
        let user = response.user;
        if (!user) {
          const decoded: any = jwtDecode(response.token);
          // Try to extract email and role from decoded token
          let role = decoded.role || decoded.roles || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          // Keep the role as returned by backend (e.g., "Tourist", "TourismCompany", etc.)
          user = {
            email: decoded.email || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            role: role
          };
        }
        if (!user.email || !user.role) {
          console.error(`[${this.serviceId}] Login failed: Invalid response (missing user info)`);
          throw new Error('Invalid server response: missing user info');
        }
        const userData: Iuser = {
          email: user.email,
          role: user.role,
          token: response.token
        };
        console.log(`[${this.serviceId}] User data extracted:`, userData);
        this.saveUserData(userData);
        console.log(`[${this.serviceId}] Login successful: ${userData.email} with role: ${userData.role}`);
        this.notificationService.show('Login successful!');
        this.redirectToDashboard(userData.role);
        return { success: true, user: userData, jwt: userData.token };
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Login failed';
        if (error.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.status === 0) {
          errorMessage = 'Failed to connect to the server, please check your network';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error(`[${this.serviceId}] Login error: ${errorMessage}`);
        this.notificationService.show(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
logout(): Observable<{ success: boolean; message: string }> {
    if (this.isBrowser && !localStorage.getItem('jwt')) {
      console.log(`[${this.serviceId}] No user logged in to log out`);
      this.notificationService.show('No session to log out');
      this.router.navigate(['/login']);
      return of({ success: true, message: 'No session to log out' });
    }
    const logoutRequest = this.http.post(`${this.baseUrl}/Account/logout`, {}).pipe(
      catchError(() => of(null))
    );
    return logoutRequest.pipe(
      map(() => {
        this.clearUserData();
        console.log(`[${this.serviceId}] Logged out successfully`);
        this.notificationService.show('Logged out successfully!');
        this.router.navigate(['/login']);
        return { success: true, message: 'Logged out successfully' };
      }),
      catchError((error: HttpErrorResponse) => {
        this.clearUserData();
        let errorMessage = 'Logout failed';
        if (error.status === 0) {
          errorMessage = 'Failed to connect to the server, logged out locally';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error(`[${this.serviceId}] Logout error: ${errorMessage}`);
        this.notificationService.show(errorMessage);
        this.router.navigate(['/login']);
        return of({ success: true, message: errorMessage });
      })
    );
  }
  public redirectToDashboard(role: string) {
    switch (role) {
      case 'tourism_company':
      case 'TourismCompany':
        this.router.navigate(['/dashboard/tourism-company']);
        break;
      case 'tourist_guide':
      case 'TourGuide':
        this.router.navigate(['/dashboard/tourist-guide']);
        break;
      case 'Tourist':
      case 'tourist':
        this.router.navigate(['/dashboard/tourist']);
        break;
      case 'hotel':
      case 'Hotel':
        this.router.navigate(['/dashboard/hotel']);
        break;
      default:
        console.log(`[${this.serviceId}] Unknown role: ${role}, redirecting to login`);
        this.router.navigate(['/login']);
    }
    console.log(`[${this.serviceId}] Redirecting to: ${role || 'login'}`);
    this.notificationService.show(`Redirecting you to the dashboard for ${role || 'login'}`);
  }
}


