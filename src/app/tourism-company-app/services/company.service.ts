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
    // localStorage.setItem("companyToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODU2NmU4OC1kY2ZhLTQxNWYtYTI2NS1hNWZiZWI2ODEzYzEiLCJqdGkiOiJkMmVjMjFkZi1jNjhkLTRmZTEtODhjYS0wNmYwNjJlODhhMmMiLCJlbWFpbCI6ImtoYWxlZC5tYWhtb3VkQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzbUNvbXBhbnkiLCJyb2xlcyI6IlRvdXJpc21Db21wYW55IiwiZXhwIjoxNzU1NTAzOTg2LCJpc3MiOiJFZ3lwdFRyaXBBcGkiLCJhdWQiOiJFZ3lwdFRyaXBBcGkifQ.HgxI6j2YLr9CNlNVg2HcDI0jv-3svLjKZOcfMPZxJ2o");
  }

  baseUrl: string = 'https://fizo.runasp.net/api';

  httpClient = inject(HttpClient);

  companyId = '';


  getCompanyBookings(companyEmail: string) {
    this.httpClient.get<Booking[]>(this.baseUrl + "/Bookings/provider/" + companyEmail).subscribe(
      (bookings) => this.bookingsSubject.next(bookings),
    );
  }

  getCompanyPackages(companyId: string) {
    console.log('id is : ' + companyId);

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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODU2NmU4OC1kY2ZhLTQxNWYtYTI2NS1hNWZiZWI2ODEzYzEiLCJqdGkiOiJkMmVjMjFkZi1jNjhkLTRmZTEtODhjYS0wNmYwNjJlODhhMmMiLCJlbWFpbCI6ImtoYWxlZC5tYWhtb3VkQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzbUNvbXBhbnkiLCJyb2xlcyI6IlRvdXJpc21Db21wYW55IiwiZXhwIjoxNzU1NTAzOTg2LCJpc3MiOiJFZ3lwdFRyaXBBcGkiLCJhdWQiOiJFZ3lwdFRyaXBBcGkifQ.HgxI6j2YLr9CNlNVg2HcDI0jv-3svLjKZOcfMPZxJ2o eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODU2NmU4OC1kY2ZhLTQxNWYtYTI2NS1hNWZiZWI2ODEzYzEiLCJqdGkiOiJkMmVjMjFkZi1jNjhkLTRmZTEtODhjYS0wNmYwNjJlODhhMmMiLCJlbWFpbCI6ImtoYWxlZC5tYWhtb3VkQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzbUNvbXBhbnkiLCJyb2xlcyI6IlRvdXJpc21Db21wYW55IiwiZXhwIjoxNzU1NTAzOTg2LCJpc3MiOiJFZ3lwdFRyaXBBcGkiLCJhdWQiOiJFZ3lwdFRyaXBBcGkifQ.HgxI6j2YLr9CNlNVg2HcDI0jv-3svLjKZOcfMPZxJ2o',
      }
    });
  }
  deletePackage(deletedPackageId: string) {
    return this.httpClient.delete<Package>(this.baseUrl + "/TourPackages/" + deletedPackageId, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODU2NmU4OC1kY2ZhLTQxNWYtYTI2NS1hNWZiZWI2ODEzYzEiLCJqdGkiOiJkMmVjMjFkZi1jNjhkLTRmZTEtODhjYS0wNmYwNjJlODhhMmMiLCJlbWFpbCI6ImtoYWxlZC5tYWhtb3VkQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzbUNvbXBhbnkiLCJyb2xlcyI6IlRvdXJpc21Db21wYW55IiwiZXhwIjoxNzU1NTAzOTg2LCJpc3MiOiJFZ3lwdFRyaXBBcGkiLCJhdWQiOiJFZ3lwdFRyaXBBcGkifQ.HgxI6j2YLr9CNlNVg2HcDI0jv-3svLjKZOcfMPZxJ2o eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODU2NmU4OC1kY2ZhLTQxNWYtYTI2NS1hNWZiZWI2ODEzYzEiLCJqdGkiOiJkMmVjMjFkZi1jNjhkLTRmZTEtODhjYS0wNmYwNjJlODhhMmMiLCJlbWFpbCI6ImtoYWxlZC5tYWhtb3VkQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzbUNvbXBhbnkiLCJyb2xlcyI6IlRvdXJpc21Db21wYW55IiwiZXhwIjoxNzU1NTAzOTg2LCJpc3MiOiJFZ3lwdFRyaXBBcGkiLCJhdWQiOiJFZ3lwdFRyaXBBcGkifQ.HgxI6j2YLr9CNlNVg2HcDI0jv-3svLjKZOcfMPZxJ2o',
      }
    }).pipe(
      tap(() => {
        const newList = this.packagesSubject.value.filter((p) => p.packageId != deletedPackageId);
        this.packagesSubject.next(newList);
      })
    );
  }


  createPackage(formData: FormData): Observable<Package> {
    return this.httpClient.post<Package>(this.baseUrl + "/TourPackages", formData, {
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
