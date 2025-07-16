import { AuthService } from './../Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../NotificationService/notification-service.service';
import { UtilsService } from '../Utils/utils.service';
import { IRegisterTouristData } from '../../Interfaces/iregister-tourist-data';
import { catchError, map, Observable, throwError } from 'rxjs';
import isEmail from 'validator/lib/isEmail';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class TouristRegisterationService {
    private readonly serviceId = 'auth-service-' + Date.now();
  constructor (
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationServiceService,
    private AuthService : AuthService,
    private utilsService: UtilsService
  ) { }
  registerTourist (InputData : IRegisterTouristData) : Observable <{message : string , OutputData : any}>{
    if (!isEmail(InputData.email)){
      console.error(`[${this.serviceId}] Failed to Add New Tourist , UnValid Email`);
      return throwError(() => new Error ('Non Valid Email'))
    }
    if (InputData.password.length<6) {
      console.error(`[${this.serviceId}] Failed to add new Tourist , Password is less than 6 char`)
      return throwError (() => new Error ('Password must be more than 6 Chars'))
    }
    const Payload = {
      firstName : InputData.firstName,
      lastName: InputData.lastName,
      email: InputData.email,
      password: InputData.password,
      phoneNumber: InputData.phoneNumber,
      address: InputData.address,
      preferences: InputData.preferences,
      favoriteDestinations: InputData.favoriteDestinations
    };
    return this.http.post('/api/Account/register/tourist', Payload).pipe(
      map((response : any) => {
        console.log(`[${this.serviceId}] Registerd succefuly ${InputData.email}`);
        this.notificationService.show('New tourist has been added');
        this.router.navigate(['/login']);
        return { message: 'Registerd succefuly', OutputData : response };
      }),
      catchError((error) => this.utilsService.handleError(error , this.serviceId)))
      }
}
