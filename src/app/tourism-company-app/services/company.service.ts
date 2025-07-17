import { inject, Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Destination, Package } from '../interfaces/package';
import { log } from 'console';

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

  constructor() {
    // localStorage.setItem("companyToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYjNlMzQwYi02MmEyLTRlNjktYTAzYi01YWRiYzQwZjdmMjciLCJqdGkiOiJkYmI3M2QwMC05ZmM2LTQxNGMtYTg1Zi1jZjkyMjliZDNkOGIiLCJlbWFpbCI6ImtoYWxlZC5tYWhtb3VkQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzbUNvbXBhbnkiLCJyb2xlcyI6IlRvdXJpc21Db21wYW55IiwiZXhwIjoxNzU1MjM1ODIzLCJpc3MiOiJFZ3lwdFRyaXBBcGkiLCJhdWQiOiJFZ3lwdFRyaXBBcGkifQ.YQMYpE-l3tabi9EAkImY8cNbYdUVxoj4GAMnSo5n2sA");
  }

  baseUrl: string = 'https://fizo.runasp.net/api';

  httpClient = inject(HttpClient);

  companyId = '';


  getCompanyBookings(companyEmail: string) {
    this.httpClient.get<Booking[]>(this.baseUrl + "/Bookings/provider/" + companyEmail).subscribe(
      (booking) => this.bookingsSubject.next(booking),
    );
  }

  getCompanyPackages(companyId: string) {
    this.companyId = companyId;
    this.httpClient.get<Package[]>(this.baseUrl + "/TourPackages/company/" + companyId).subscribe((companyPackage) => {
      this.packagesSubject.next(companyPackage);
    });
  }

  getPackageById(packageId: string): Observable<Package> {
    return this.httpClient.get<Package>(this.baseUrl + "/TourPackages/" + packageId);
  }

  editPackage(editedPackage: Package): Observable<Package> {
    console.log("package payload : " + editedPackage.packageName);
    console.log("package payload id : " + editedPackage.packageId);
    return this.httpClient.put<Package>(this.baseUrl + "/TourPackages/" + editedPackage.packageId, editedPackage, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("companyToken"),
      }
    });
  }
  deletePackage(deletedPackageId: string) {
    return this.httpClient.delete<Package>(this.baseUrl + "/TourPackages/" + deletedPackageId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("companyToken"),
      }
    }).pipe(
      tap(() => {
        const newList = this.packagesSubject.value.filter((p) => p.packageId != deletedPackageId);
        this.packagesSubject.next(newList);
      })
    );
  }


  createPackage(newPackage: Package): Observable<Package> {
    return this.httpClient.post<Package>(this.baseUrl + "/TourPackages", newPackage, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("companyToken"),
      }
    },);
  }

  getDestinations() {
    this.httpClient.get<Destination[]>(this.baseUrl + "/Destinations").subscribe(
      (destinations) => { this.destinationSubject.next(destinations); }
    );
  }
}
