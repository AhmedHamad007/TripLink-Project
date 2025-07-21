import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../NotificationService/notification-service.service';
import { UtilsService } from '../Utils/utils.service';
import { IRegisterTourismCompanyData } from '../../Interfaces/iregister-tourism-company-data';
import { catchError, map, Observable, throwError } from 'rxjs';
import isEmail from 'validator/lib/isEmail';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TourismCompanyRegisterationService {
  private readonly serviceId = 'tourism-company-service-' + Date.now();
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationServiceService,
    private utilsService: UtilsService,
    private Authservice : AuthService
  ) { }


  registerTourismCompany(InputData: IRegisterTourismCompanyData): Observable<{ message: string; OutputData: any }> {
  if (!isEmail(InputData.email) || !isEmail(InputData.contactEmail)) {
    console.error(`[${this.Authservice.baseUrl}] Tourist company registration failed: Invalid email`);
    return throwError(() => new Error('Invalid email'));
  }
  if (InputData.password.length < 6) {
    console.error(`[${this.serviceId}] Tourist company registration failed: short password`);
    return throwError(() => new Error('Password must be at least 6 characters long'));
  }
  const payload = {
    firstName: InputData.firstName,
    lastName: InputData.lastName,
    email: InputData.email,
    password: InputData.password,
    phoneNumber: InputData.phoneNumber,
    address: InputData.address,
    companyName: InputData.companyName,
    licenseNumber: InputData.licenseNumber,
    description: InputData.description,
    role: 'tourism_company',
    contactEmail: InputData.contactEmail,
    contactPhone: InputData.contactPhone
  };
  return this.http.post('/api/Account/register/tourismcompany', payload).pipe(
    map((response: any) => {
      console.log(`[${this.serviceId}] A tourism company has been successfully registered.: ${InputData.email}`);
      this.notificationService.show('A tourism company has been successfully registered.');
      this.router.navigate(['/login']);
      return { message: 'successfully registered', OutputData: response };
    }),
catchError((error) => this.utilsService.handleError(error, this.serviceId)));
}

}
