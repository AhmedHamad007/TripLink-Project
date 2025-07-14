import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userSubject: BehaviorSubject<any>;

  constructor(private router: Router) {
    // Safely parse localStorage user data, default to null if invalid or missing
    let userData = null;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        userData = JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse user data from localStorage:', e);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
    this.userSubject = new BehaviorSubject<any>(userData);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  // Token Mock
  private generateMockJwt(user: any): string {
    const payload = { userId: user.id, email: user.email, role: user.role };
    return btoa(JSON.stringify(payload));
  }

  // Register Tourism Company
  registerTourismCompany(data: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newCompany = {
      id: users.length + 1,
      email: data.email,
      password: data.password,
      role: 'tourism_company',
      name: data.name,
      license: data.license,
      address: data.address,
      description: data.description
    };
    users.push(newCompany);
    localStorage.setItem('users', JSON.stringify(users));
    return of({ success: true }).pipe(
      map(() => {
        return { message: 'Registration successful' };
      })
    );
  }

  // Register Tourist
  registerTourist(data: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newTourist = {
      id: users.length + 1,
      email: data.email,
      password: data.password,
      role: 'tourist',
      name: data.name,
      nationality: data.nationality
    };
    users.push(newTourist);
    localStorage.setItem('users', JSON.stringify(users));
    return of({ success: true }).pipe(
      map(() => {
        return { message: 'Registration successful' };
      })
    );
  }

  // Register Hotel
  registerHotel(data: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newHotel = {
      id: users.length + 1,
      email: data.email,
      password: data.password,
      role: 'hotel',
      name: data.name,
      stars: data.stars,
      location: data.location
    };
    users.push(newHotel);
    localStorage.setItem('users', JSON.stringify(users));
    return of({ success: true }).pipe(
      map(() => {
        return { message: 'Registration successful' };
      })
    );
  }

  // Register Tour Guide
  registerTouristGuide(data: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newTouristGuide = {
      id: users.length + 1,
      email: data.email,
      password: data.password,
      role: 'tourist_guide',
      name: data.name,
      specialty: data.specialty,
      languages: data.languages
    };
    users.push(newTouristGuide);
    localStorage.setItem('users', JSON.stringify(users));
    return of({ success: true }).pipe(
      map(() => {
        return { message: 'Registration successful' };
      })
    );
  }

  // Login
  login(email: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      return of({ success: false, message: 'Invalid email or password' });
    }
    const token = this.generateMockJwt(user);
    const userData = { ...user, token };
    this.userSubject.next(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user with token
    localStorage.setItem('jwt', token);
    this.redirectToDashboard(user.role);
    return of({ success: true, user, jwt: token });
  }

  // Logout
  logout(): Observable<{ success: boolean; message: string }> {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    return of({ success: true, message: 'Logged out successfully' });
  }

  public redirectToDashboard(role: string) {
    switch (role) {
      case 'tourism_company':
        this.router.navigate(['/dashboard/tourism-company']);
        break;
      case 'tourist_guide':
        this.router.navigate(['/dashboard/tourist-guide']);
        break;
      case 'tourist':
        this.router.navigate(['/dashboard/tourist']);
        break;
      case 'hotel':
        this.router.navigate(['/dashboard/hotel']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}