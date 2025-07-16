import { AuthService } from './../Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../NotificationService/notification-service.service';
import { UtilsService } from '../Utils/utils.service';
import { IRegisterHotelData } from '../../Interfaces/iregister-hotel-data';
import { catchError, map, Observable, throwError } from 'rxjs';
import isEmail from 'validator/lib/isEmail';

@Injectable({
  providedIn: 'root'
})
export class HotelRegisterationService {
private readonly serviceId = 'hotel-service-' + Date.now();

  constructor(
    private http: HttpClient,
    private router: Router,
    private AuthService : AuthService,
    private notificationService: NotificationServiceService,
    private utilsService: UtilsService
  ) {}

  registerHotel(InputData: IRegisterHotelData): Observable<{ message: string; OutputData: any }> {
    if (!isEmail(InputData.email) || !isEmail(InputData.contactEmail)) {
      console.error(`[${this.serviceId}] Hotel registration failed: Invalid email`);
      return throwError(() => new Error('Invalid email'));
    }
    if (InputData.password.length < 6) {
      console.error(`[${this.serviceId}] Hotel registration failed: password is too short`);
      return throwError(() => new Error('Password must be at least 6 characters long'));
    }
    if (InputData.rating < 1 || InputData.rating > 5) {
      console.error(`[${this.serviceId}] Hotel registration failed: Invalid rating`);
      return throwError(() => new Error('The rating should be between 1 and 5.'));
    }
    const payload = {
      firstName: InputData.firstName,
      lastName: InputData.lastName,
      email: InputData.email,
      password: InputData.password,
      phoneNumber: InputData.phoneNumber,
      address: InputData.address,
      hotelName: InputData.hotelName,
      hotelAddress: InputData.hotelAddress,
      description: InputData.description,
      rating: InputData.rating,
      role: 'hotel',
      contactEmail: InputData.contactEmail,
      contactPhone: InputData.contactPhone
    };
    return this.http.post('/api/Account/register/hotel', payload).pipe(
      map((response: any) => {
        console.log(`[${this.serviceId}] Successful hotel registration: ${InputData.email}`);
        this.notificationService.show('Successful hotel registration:');
        this.router.navigate(['/login']);
        return { message: ' Successful registration:', OutputData: response };
      }),
      catchError((error) => this.utilsService.handleError(error, this.serviceId))
    );
  }
}
