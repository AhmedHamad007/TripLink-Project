import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from './login/user';
import { map, Observable, tap } from 'rxjs';
import { DecodedToken } from './decoded-token';
import { NavigationExtras, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog-component/alert-dialog-component';
import { HotelDashBoard } from '../../hotels-app/interfaces/hotel-dashboard';
import { Tourist } from '../../tourist/tourist';
import { TourGuide } from '../../tour-guides-app/interfaces/tour-guide';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://fizo.runasp.net/api/Account';

  client = inject(HttpClient);

  id: string = '';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private matDialog: MatDialog) {
  }


  public currentUser: Observable<User | null> | undefined;

  login(user: User): Observable<User> {
    console.log(user);

    return this.client.post<User>(
      this.baseUrl + '/login',
      {
        email: user.email,
        password: user.password,
      },
    ).pipe(
      tap(e => {
        console.log(e);
        this.saveUser(e);
        this.navigateBasedOnRole();
      })
    );
  }


  register(hotel: any, role: string) {
    this.client.post<User>(this.baseUrl + `/register/${role}`, hotel).subscribe(
      {
        next: (value) => {
          this.saveUser(value);
          this.matDialog.open(AlertDialogComponent, {
            data: {
              title: 'TripLink',
              message: 'Registeration is Successful!'
            }
          })
          this.navigateToLogin();
        },
        error: (err: { error: { errors: [] } }) => {
          err.error.errors.map((e) => {
            this.matDialog.open(AlertDialogComponent, {
              data: {
                title: 'Error',
                message: e,
              }
            })
          });
        }
      }
    );
  }

  navigateToLogin() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  public getRoleFromToken() {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;

    localStorage.setItem('id', decoded.sub);

    console.log(decoded);


    const role =
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
      decoded.roles;

    return role;
  }

  public getDecodedToken() {
    const token = this.getToken();
    if (!token) {
      console.warn('No token found in localStorage!');
      return null;
    }
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }
  public saveUser(user: User): void {
    localStorage.removeItem('token');
    localStorage.setItem('token', user.token!);
  }

  //use later for logout

  // private clearUser(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  // }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  public navigateBasedOnRole(): void {
    const role = this.getRoleFromToken();

    if (!role) {
      this.router.navigate(['/']);
      return;
    }

    switch (role.toLowerCase()) {
      case 'hotel':
        this.router.navigate(['/hotel/dashboard'], { replaceUrl: true });

        break;

      case 'tourismcompany':
        this.router.navigate(['/company/dashboard'], { replaceUrl: true });

        break;

      case 'tourist':
        this.router.navigate(['/tourist/dashboard'], { replaceUrl: true });
        break;

      case 'tourguide':
        this.router.navigate(['/tour-guide'], { replaceUrl: true });
        break;

      default:
        this.router.navigate(['/'], { replaceUrl: true });
        break;
    }
  }

}


