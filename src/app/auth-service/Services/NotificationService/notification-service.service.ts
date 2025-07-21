import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
show(message: string): void {
    alert(message); 
  }}
