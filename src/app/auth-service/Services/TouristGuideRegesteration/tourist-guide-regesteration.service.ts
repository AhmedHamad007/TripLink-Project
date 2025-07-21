import { AuthService } from './../Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../NotificationService/notification-service.service';
import { UtilsService } from '../Utils/utils.service';
import { IRegisterTourGuideData } from '../../Interfaces/iregister-tour-guide-data';
import { catchError, map, Observable, throwError } from 'rxjs';
import isEmail from 'validator/lib/isEmail';

@Injectable({
  providedIn: 'root'
})
export class TouristGuideRegesterationService {
private readonly serviceId = 'tourism-company-service-' + Date.now();

  constructor(
    private http: HttpClient,
    private router: Router,
    private AuthService : AuthService ,
    private notificationService: NotificationServiceService,
    private utilsService: UtilsService
  ) {}
  registerTouristGuide(InputData: IRegisterTourGuideData): Observable<{ message: string; OutputData: any }> {
  if (!isEmail(InputData.email) || !isEmail(InputData.contactEmail)) {
    console.error(`[${this.serviceId}]Tour guide registration failed: Invalid email` );
    return throwError(() => new Error('Invalid email'));
  }
  if (InputData.password.length < 6) {
    console.error(`[${this.serviceId}] Tour guide registration failed: password is too short`);
    return throwError(() => new Error('Password must be at least 6 characters long'));
  }
  if (InputData.pricePerHour <= 0) {
    console.error(`[${this.serviceId}] Tour guide registration failed: Invalid price`);
    return throwError(() => new Error('The price per hour must be greater than (0)'));
  }
  const payload = {
    firstName: InputData.firstName,
    lastName: InputData.lastName,
    email: InputData.email,
    password: InputData.password,
    phoneNumber: InputData.phoneNumber,
    address: InputData.address,
    guideName: InputData.guideName,
    licenseNumber: InputData.licenseNumber,
    languages: InputData.languages,
    areasCovered: InputData.areasCovered,
    pricePerHour: InputData.pricePerHour,
    contactEmail: InputData.contactEmail,
    contactPhone: InputData.contactPhone,
    role: 'tourist_guide'
  };
  return this.http.post('/api/Account/register/tourguide', payload).pipe(
    map((response: any) => {
      console.log(`[${this.serviceId}] Successfully register as a tour guide: ${InputData.email}`);
      this.notificationService.show('Successfully register as a tour guide');
      this.router.navigate(['/login']);
      return { message: 'Successfully registerd', OutputData: response };
    }),
catchError((error) => this.utilsService.handleError(error, this.serviceId))  );
}
}
