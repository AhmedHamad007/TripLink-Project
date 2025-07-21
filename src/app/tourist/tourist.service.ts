import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Booking, Tourist } from './tourist';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  touristSubject$ = new ReplaySubject<Tourist>();
  touristDashBoard$ = this.touristSubject$.asObservable();
  deleteBooking(id: string) {
    return this.client.delete<Tourist>(this.baseUrl + 'Bookings/' + id, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDliZDIwYi1jYjUwLTQyY2UtYTA3Mi0yMTE2NTdmNGMwOWEiLCJqdGkiOiIxZDNhNGQwMC00NDg2LTRiYzEtYWY2Ni0zMGU3ZjU4MzZkYTAiLCJlbWFpbCI6ImFsaWNlLnNtaXRoQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzdCIsInJvbGVzIjoiVG91cmlzdCIsImV4cCI6MTc1NTYzMzg1NiwiaXNzIjoiRWd5cHRUcmlwQXBpIiwiYXVkIjoiRWd5cHRUcmlwQXBpIn0.iijIK5F9PKjOhUvu7t7gBvd5V2AJRsl7ueRT9bgGV7Y',
      }
    }).pipe(tap(e => {
      this.touristDashBoard$.subscribe(
        (t) => {
          t.bookings = t.bookings.filter((x) => x.bookingID != id);
        }
      )
    }));
  }

  baseUrl = 'https://fizo.runasp.net/api/'

  constructor(private client: HttpClient) { }

  getTourist() {
    this.client.get<Tourist>(this.baseUrl + 'Dashboard/tourist', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDliZDIwYi1jYjUwLTQyY2UtYTA3Mi0yMTE2NTdmNGMwOWEiLCJqdGkiOiIxZDNhNGQwMC00NDg2LTRiYzEtYWY2Ni0zMGU3ZjU4MzZkYTAiLCJlbWFpbCI6ImFsaWNlLnNtaXRoQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzdCIsInJvbGVzIjoiVG91cmlzdCIsImV4cCI6MTc1NTYzMzg1NiwiaXNzIjoiRWd5cHRUcmlwQXBpIiwiYXVkIjoiRWd5cHRUcmlwQXBpIn0.iijIK5F9PKjOhUvu7t7gBvd5V2AJRsl7ueRT9bgGV7Y',
      }
    }).subscribe((e) => this.touristSubject$.next(e));
  }

  editProfile(tourist: Tourist): Observable<Object> {
    return this.client.put<Object>(this.baseUrl + 'Dashboard/profile', {
      firstName: tourist.name.split(' ')[0],
      lastName: tourist.name.split(' ')[1],
    }, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDliZDIwYi1jYjUwLTQyY2UtYTA3Mi0yMTE2NTdmNGMwOWEiLCJqdGkiOiIxZDNhNGQwMC00NDg2LTRiYzEtYWY2Ni0zMGU3ZjU4MzZkYTAiLCJlbWFpbCI6ImFsaWNlLnNtaXRoQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzdCIsInJvbGVzIjoiVG91cmlzdCIsImV4cCI6MTc1NTYzMzg1NiwiaXNzIjoiRWd5cHRUcmlwQXBpIiwiYXVkIjoiRWd5cHRUcmlwQXBpIn0.iijIK5F9PKjOhUvu7t7gBvd5V2AJRsl7ueRT9bgGV7Y',
      }
    });
  }

  editBooking(booking: Booking): Observable<Booking> {
    return this.client.put<Booking>(this.baseUrl + 'Bookings/' + booking.bookingID, booking, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDliZDIwYi1jYjUwLTQyY2UtYTA3Mi0yMTE2NTdmNGMwOWEiLCJqdGkiOiIxZDNhNGQwMC00NDg2LTRiYzEtYWY2Ni0zMGU3ZjU4MzZkYTAiLCJlbWFpbCI6ImFsaWNlLnNtaXRoQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzdCIsInJvbGVzIjoiVG91cmlzdCIsImV4cCI6MTc1NTYzMzg1NiwiaXNzIjoiRWd5cHRUcmlwQXBpIiwiYXVkIjoiRWd5cHRUcmlwQXBpIn0.iijIK5F9PKjOhUvu7t7gBvd5V2AJRsl7ueRT9bgGV7Y',
      }
    });
  }

  getBooking(id: string): Observable<Booking> {
    return this.client.get<Booking>(this.baseUrl + 'Bookings/' + id, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDliZDIwYi1jYjUwLTQyY2UtYTA3Mi0yMTE2NTdmNGMwOWEiLCJqdGkiOiIxZDNhNGQwMC00NDg2LTRiYzEtYWY2Ni0zMGU3ZjU4MzZkYTAiLCJlbWFpbCI6ImFsaWNlLnNtaXRoQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91cmlzdCIsInJvbGVzIjoiVG91cmlzdCIsImV4cCI6MTc1NTYzMzg1NiwiaXNzIjoiRWd5cHRUcmlwQXBpIiwiYXVkIjoiRWd5cHRUcmlwQXBpIn0.iijIK5F9PKjOhUvu7t7gBvd5V2AJRsl7ueRT9bgGV7Y',
      }
    });
  }
}
