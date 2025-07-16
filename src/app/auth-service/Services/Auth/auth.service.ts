import { IRegisterTourismCompanyData } from './../../Interfaces/iregister-tourism-company-data';
import { NotificationServiceService } from './../NotificationService/notification-service.service';
import { jwtDecode } from 'jwt-decode';
import { Iuser } from './../../Interfaces/iuser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID, input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { log, error } from 'console';
import { IRegisterTouristData } from '../../Interfaces/iregister-tourist-data';
import isEmail from 'validator/lib/isEmail';
import { response } from 'express';
import { IRegisterHotelData } from '../../Interfaces/iregister-hotel-data';
import { IRegisterTourGuideData } from '../../Interfaces/iregister-tour-guide-data';
import { UtilsService } from '../Utils/utils.service';

interface LoginResponse {
  token: string;
  user: {
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = 'http://fizo.runasp.net/api'
  public user : Observable<Iuser | null> ;
  private userSubject : BehaviorSubject<Iuser | null>;
  private readonly serviceId = 'auth-service-' + Date.now();
  private isBrowser: boolean;

    // To use Below
  public saveUserData(userData: Iuser): void {
    if (this.isBrowser) {
      this.userSubject.next(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('jwt', userData.token);
    }
  }

  public clearUserData(): void {
    if (this.isBrowser) {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
    }
    this.userSubject.next(null);
  }
 

  constructor (
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationServiceService,
    private utilsService: UtilsService,
    @Inject(PLATFORM_ID) private platformId: Object
  )
  
  // session Handle
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
    let userData: Iuser | null = null;
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          userData = JSON.parse(storedUser);
          if (userData?.token) {
            const decoded: any = jwtDecode(userData.token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
              throw new Error('Token expired');
            }
          }
          console.log(`[${this.serviceId}]User configured successfully: ${userData?.email}`);
        } catch (e) {
          this.notificationService.show('Not valid session data , pls Login again');
          console.error(`[${this.serviceId}] Faild to analyise the data :`, e); 
          this.clearUserData(),
          this.router.navigate(['/login'])
        }
      }
    }
    this.userSubject = new BehaviorSubject <Iuser | null>(userData)
    this.user = this.userSubject.asObservable();
  }

// get method Handle
  public get userValue() : Iuser | null {
    const user = this.userSubject.value;
    if (!user || !user.token) {
      console.log(`[${this.serviceId}] InValid User`);
      return null ;
    }
    const Decoded : any = jwtDecode (user.token) ;
    const currentTime = Date.now() / 1000;
          if (Decoded.exp < currentTime) {
            console.log (`[${this.serviceId}]  InValid Token`)
            this.clearUserData();
            return null
          }
          console.log(`[${this.serviceId}] Getting user : ${user.email}` )
          return user
  }


/////////////////////////////////////////// login
login(email: string, password: string): Observable<{ success: boolean; user: Iuser; jwt: string }> {
    if (!isEmail(email)) {
      console.error(`[${this.serviceId}] Login failed: Invalid email`);
      return throwError(() => new Error('Invalid email address'));
    }
    if (password.length < 6) {
      console.error(`[${this.serviceId}] Login failed: Password too short`);
      return throwError(() => new Error('Password must be at least 6 characters long'));
    }
    const payload = { email, password };
    return this.http.post<any>('/api/Account/login', payload).pipe(
      map((response: any) => {
        if (!response.token) {
          console.error(`[${this.serviceId}] Login failed: Invalid response (missing token)`);
          throw new Error('Invalid server response: missing token');
        }
        // If user is not present, decode from token
        let user = response.user;
        if (!user) {
          const decoded: any = jwtDecode(response.token);
          // Try to extract email and role from decoded token
          let role = decoded.role || decoded.roles || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          if (role) {
            // Normalize possible backend values to your expected values
            switch (role.toLowerCase().replace(/[\s-]/g, '')) {
              case 'tourismcompany':
                role = 'tourism_company';
                break;
              case 'touristguide':
                role = 'tourist_guide';
                break;
              // Add other mappings if needed
            }
          }
          user = {
            email: decoded.email || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            role: role
          };
        }
        if (!user.email || !user.role) {
          console.error(`[${this.serviceId}] Login failed: Invalid response (missing user info)`);
          throw new Error('Invalid server response: missing user info');
        }
        const userData: Iuser = {
          email: user.email,
          role: user.role,
          token: response.token
        };
        this.saveUserData(userData);
        console.log(`[${this.serviceId}] Login successful: ${userData.email}`);
        this.notificationService.show('Login successful!');
        this.redirectToDashboard(userData.role);
        return { success: true, user: userData, jwt: userData.token };
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Login failed';
        if (error.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.status === 0) {
          errorMessage = 'Failed to connect to the server, please check your network';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error(`[${this.serviceId}] Login error: ${errorMessage}`);
        this.notificationService.show(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
logout(): Observable<{ success: boolean; message: string }> {
    if (this.isBrowser && !localStorage.getItem('jwt')) {
      console.log(`[${this.serviceId}] No user logged in to log out`);
      this.notificationService.show('No session to log out');
      this.router.navigate(['/login']);
      return of({ success: true, message: 'No session to log out' });
    }
    const logoutRequest = this.http.post(`${this.baseUrl}/Account/logout`, {}).pipe(
      catchError(() => of(null))
    );
    return logoutRequest.pipe(
      map(() => {
        this.clearUserData();
        console.log(`[${this.serviceId}] Logged out successfully`);
        this.notificationService.show('Logged out successfully!');
        this.router.navigate(['/login']);
        return { success: true, message: 'Logged out successfully' };
      }),
      catchError((error: HttpErrorResponse) => {
        this.clearUserData();
        let errorMessage = 'Logout failed';
        if (error.status === 0) {
          errorMessage = 'Failed to connect to the server, logged out locally';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error(`[${this.serviceId}] Logout error: ${errorMessage}`);
        this.notificationService.show(errorMessage);
        this.router.navigate(['/login']);
        return of({ success: true, message: errorMessage });
      })
    );
  }
  public redirectToDashboard(role: string) {
    const normalizedRole = role.toLowerCase();
    switch (normalizedRole) {
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
    console.log(`[${this.serviceId}] Redirecting to: ${role || 'login'}`);
    this.notificationService.show(`Redirecting you to the dashboard for ${role || 'login'}`);
  }
}





































































































//Login Response error Handle 
//   handleError(HttpError:HttpErrorResponse){
//   let errorMessage = "Unknown Problem"
//   if (HttpError.error instanceof ErrorEvent){
//     errorMessage = `Problem in user ${HttpError.error.message}`; 
//   }
//   else {
//     switch (HttpError.status){
//       case 400 :
//         errorMessage = 'Bad data Request'
//         break;
//       case 401 :
//         errorMessage = 'Login Failed , Email or Password Not valid'
//         this.router.navigate(['/login'])
//         break;
//       case 500 :
//         errorMessage = 'server not available , try again later' 
//         break;
//       default :
//       errorMessage = `Error : ${HttpError.status} , ${HttpError.message}` 
//     } 
//     if (HttpError.error && HttpError.error.message){
//       errorMessage = HttpError.error.message;
//     }
//   }
//   this.notificationService.show(errorMessage);
//   console.error(`[${this.serviceId}] Wrong: ${errorMessage}`);
//   return throwError(() => new Error (errorMessage))
//  }

 // Regesteration 
// registerTourist (InputData : IRegisterTouristData) : Observable <{message : string , OutputData : any}>{
//   if (!isEmail(InputData.email)){
//     console.error(`[${this.serviceId}] Failed to Add New Tourist , UnValid Email`);
//     return throwError(() => new Error ('Non Valid Email'))
//   }
//   if (InputData.password.length<6) {
//     console.error(`[${this.serviceId}] Failed to add new Tourist , Password is less than 6 char`)
//     return throwError (() => new Error ('Password must be more than 6 Chars'))
//   }
//   const Payload = {
//     firstName : InputData.firstName,
//     lastName: InputData.lastName,
//     email: InputData.email,
//     password: InputData.password,
//     phoneNumber: InputData.phoneNumber,
//     address: InputData.address,
//     preferences: InputData.preferences,
//     favoriteDestinations: InputData.favoriteDestinations
//   };
//   return this.http.post(`[${this.baseUrl}]/Account/register/tourist` , Payload).pipe(
//     map((response : any) => {
//       console.log(`[${this.serviceId}] Registerd succefuly ${InputData.email}`);
//       this.notificationService.show('New tourist has been added');
//       this.router.navigate(['/login']);
//       return { message: 'Registerd succefuly', OutputData : response };
//     }),
//     catchError(this.handleError))
//     }


////////////////////////////////////////////


// registerTourismCompany(InputData: IRegisterTourismCompanyData): Observable<{ message: string; OutputData: any }> {
//   if (!isEmail(InputData.email) || !isEmail(InputData.contactEmail)) {
//     console.error(`[${this.serviceId}] فشل تسجيل شركة سياحية: البريد الإلكتروني غير صالح`);
//     return throwError(() => new Error('البريد الإلكتروني غير صالح'));
//   }
//   if (InputData.password.length < 6) {
//     console.error(`[${this.serviceId}] فشل تسجيل شركة سياحية: كلمة المرور قصيرة`);
//     return throwError(() => new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل'));
//   }
//   const payload = {
//     firstName: InputData.firstName,
//     lastName: InputData.lastName,
//     email: InputData.email,
//     password: InputData.password,
//     phoneNumber: InputData.phoneNumber,
//     address: InputData.address,
//     companyName: InputData.companyName,
//     licenseNumber: InputData.licenseNumber,
//     description: InputData.description,
//     role: 'tourism_company',
//     contactEmail: InputData.contactEmail,
//     contactPhone: InputData.contactPhone
//   };
//   return this.http.post(`${this.baseUrl}/Account/register/tourismcompany`, payload).pipe(
//     map((response: any) => {
//       console.log(`[${this.serviceId}] تم تسجيل شركة سياحية بنجاح: ${InputData.email}`);
//       this.notificationService.show('تم تسجيل الشركة السياحية بنجاح!');
//       this.router.navigate(['/login']);
//       return { message: 'تم التسجيل بنجاح', OutputData: response };
//     }),
//     catchError(this.handleError)
//   );
// }

////////////////////////////////

// registerHotel(InputData: IRegisterHotelData): Observable<{ message: string; OutputData: any }> {
//   if (!isEmail(InputData.email) || !isEmail(InputData.contactEmail)) {
//     console.error(`[${this.serviceId}] فشل تسجيل فندق: البريد الإلكتروني غير صالح`);
//     return throwError(() => new Error('البريد الإلكتروني غير صالح'));
//   }
//   if (InputData.password.length < 6) {
//     console.error(`[${this.serviceId}] فشل تسجيل فندق: كلمة المرور قصيرة`);
//     return throwError(() => new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل'));
//   }
//   if (InputData.rating < 1 || InputData.rating > 5) {
//     console.error(`[${this.serviceId}] فشل تسجيل فندق: التقييم غير صالح`);
//     return throwError(() => new Error('التقييم يجب أن يكون بين 1 و5'));
//   }
//   const payload = {
//     firstName: InputData.firstName,
//     lastName: InputData.lastName,
//     email: InputData.email,
//     password: InputData.password,
//     phoneNumber: InputData.phoneNumber,
//     address: InputData.address,
//     hotelName: InputData.hotelName,
//     hotelAddress: InputData.hotelAddress,
//     description: InputData.description,
//     rating: InputData.rating,
//     contactEmail: InputData.contactEmail,
//     contactPhone: InputData.contactPhone
//   };
//   return this.http.post(`${this.baseUrl}/Account/register/hotel`, payload).pipe(
//     map((response: any) => {
//       console.log(`[${this.serviceId}] تم تسجيل فندق بنجاح: ${InputData.email}`);
//       this.notificationService.show('تم تسجيل الفندق بنجاح!');
//       this.router.navigate(['/login']);
//       return { message: 'تم التسجيل بنجاح', OutputData: response };
//     }),
//     catchError(this.handleError)
//   );
// }

//////////////////////////////////////

// registerTouristGuide(InputData: IRegisterTourGuideData): Observable<{ message: string; OutputData: any }> {
//   if (!isEmail(InputData.email) || !isEmail(InputData.contactEmail)) {
//     console.error(`[${this.serviceId}] فشل تسجيل مرشد سياحي: البريد الإلكتروني غير صالح`);
//     return throwError(() => new Error('البريد الإلكتروني غير صالح'));
//   }
//   if (InputData.password.length < 6) {
//     console.error(`[${this.serviceId}] فشل تسجيل مرشد سياحي: كلمة المرور قصيرة`);
//     return throwError(() => new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل'));
//   }
//   if (InputData.pricePerHour <= 0) {
//     console.error(`[${this.serviceId}] فشل تسجيل مرشد سياحي: السعر غير صالح`);
//     return throwError(() => new Error('السعر لكل ساعة يجب أن يكون أكبر من 0'));
//   }
//   const payload = {
//     firstName: InputData.firstName,
//     lastName: InputData.lastName,
//     email: InputData.email,
//     password: InputData.password,
//     phoneNumber: InputData.phoneNumber,
//     address: InputData.address,
//     guideName: InputData.guideName,
//     licenseNumber: InputData.licenseNumber,
//     languages: InputData.languages,
//     areasCovered: InputData.areasCovered,
//     pricePerHour: InputData.pricePerHour,
//     contactEmail: InputData.contactEmail,
//     contactPhone: InputData.contactPhone
//   };
//   return this.http.post(`${this.baseUrl}/Account/register/tourguide`, payload).pipe(
//     map((response: any) => {
//       console.log(`[${this.serviceId}] تم تسجيل مرشد سياحي بنجاح: ${InputData.email}`);
//       this.notificationService.show('تم تسجيل المرشد السياحي بنجاح!');
//       this.router.navigate(['/login']);
//       return { message: 'تم التسجيل بنجاح', OutputData: response };
//     }),
//     catchError(this.handleError)
//   );
// }