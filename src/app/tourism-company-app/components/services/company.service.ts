import { inject, Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Destination, Package } from '../interfaces/package';
import { log } from 'console';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  private packagesSubject = new BehaviorSubject<Package[]>([]);
  packages$ = this.packagesSubject.asObservable();
  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  bookings$ = this.bookingsSubject.asObservable();
  private destinationSubject = new BehaviorSubject<Destination[]>([]);
  destinations$ = this.destinationSubject.asObservable();

  constructor(private authService: AuthService) {
    // No need for localStorage token management
  }

  baseUrl: string = 'https://fizo.runasp.net/api';

  httpClient = inject(HttpClient);

  companyId = '';

  private getCompanyIdFromToken(token: string): string | null {
    try {
      const decoded: any = jwtDecode(token);
      // Try common claim names for companyId
      return decoded.companyId || decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
    } catch {
      return null;
    }
  }

  getCompanyBookings(companyEmail?: string) {
    const user = this.authService.userValue;
    const email = companyEmail || user?.email;
    const token = user?.token;
    if (!email) {
      alert('No company email found. Please log in again.');
      return;
    }
    if (!token) {
      alert('No authentication token found. Please log in again.');
      return;
    }
    this.httpClient.get<Booking[]>(this.baseUrl + "/Bookings/provider/" + email, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }).subscribe(
      (booking) => this.bookingsSubject.next(booking),
      (error) => alert('Failed to fetch bookings: ' + (error?.message || error))
    );
  }

  getCompanyPackages() {
    const user = this.authService.userValue;
    const token = user?.token;
    if (!token) {
      alert('No authentication token found. Please log in again.');
      return;
    }
    this.httpClient.get<Package[]>(this.baseUrl + "/TourPackages", {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }).subscribe((companyPackage) => {
      console.log('Packages from backend:', companyPackage);
      this.packagesSubject.next(companyPackage);
    }, (error) => alert('Failed to fetch packages: ' + (error?.message || error)));
  }

  getPackageById(packageId: string): Observable<Package> {
    const token = this.authService.userValue?.token;
    return this.httpClient.get<Package>(this.baseUrl + "/TourPackages/" + packageId, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
  }

  editPackage(editedPackage: Package): Observable<Package> {
    const token = this.authService.userValue?.token;
    console.log("package payload : " + editedPackage.packageName);
    console.log("package payload id : " + editedPackage.packageId);
    return this.httpClient.put<Package>(this.baseUrl + "/TourPackages/" + editedPackage.packageId, editedPackage, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
  }
  deletePackage(deletedPackageId: string) {
    const token = this.authService.userValue?.token;
    return this.httpClient.delete<Package>(this.baseUrl + "/TourPackages/" + deletedPackageId, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }).pipe(
      tap(() => {
        const newList = this.packagesSubject.value.filter((p) => p.packageId != deletedPackageId);
        this.packagesSubject.next(newList);
      })
    );
  }


  createPackage(newPackage: Package): Observable<Package> {
    const token = this.authService.userValue?.token;
    return this.httpClient.post<Package>(this.baseUrl + "/TourPackages", newPackage, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    },);
  }

  getDestinations() {
    this.httpClient.get<Destination[]>(this.baseUrl + "/Destinations").subscribe(
      (destinations) => { this.destinationSubject.next(destinations); }
    );
  }
}
