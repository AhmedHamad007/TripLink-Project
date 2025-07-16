import { Router } from '@angular/router';
import { NotificationServiceService } from './../NotificationService/notification-service.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private NotificationService: NotificationServiceService,
    private router :Router
  ) { }

  handleError(HttpError:HttpErrorResponse , serviceId : string) : Observable<never>{
  let errorMessage = "Unknown Problem"
  if (HttpError.error instanceof ErrorEvent){
    errorMessage = `Problem in user ${HttpError.error.message}`; 
  }
  else {
    switch (HttpError.status){
      case 400 :
        errorMessage = 'Bad data Request'
        break;
      case 401 :
        errorMessage = 'Login Failed , Email or Password Not valid'
        this.router.navigate(['/login'])
        break;
      case 500 :
        errorMessage = 'server not available , try again later' 
        break;
      default :
      errorMessage = `Error : ${HttpError.status} , ${HttpError.message}` 
    } 
    if (HttpError.error && HttpError.error.message){
      errorMessage = HttpError.error.message;
    }
  }
    console.error(`[${serviceId}] Error: ${errorMessage}`);
    this.NotificationService.show(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
