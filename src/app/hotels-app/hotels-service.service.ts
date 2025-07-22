import { Hotel, HotelDashBoard, Room } from './interfaces/hotel-dashboard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service/Services/Auth/auth.service';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { AlertDialogComponent } from '../alert-dialog-component/alert-dialog-component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  editProfile(formData: FormData, hotelId: string): Observable<Hotel> {
    const token = this.authService.userValue?.token;
    let headers = undefined;
    if (token) {
      headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return this.client.put<Hotel>(this.baseUrl + 'Hotels/' + hotelId, formData, { headers });
  }
  editRoom(room: FormData, roomId: string) {
    const token = this.authService.userValue?.token;
    let headers = undefined;
    if (token) {
      headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return this.client.put<Room>(this.baseUrl + 'rooms/' + roomId, room, { headers }).subscribe({
      next: (value) => {
        this.matDialog.open(AlertDialogComponent, {
          data: {
            title: 'TripLink',
            message: 'Room Updated Successfully'
          }
        });
        this.hotelDashBoard$.subscribe(
          (hotel) => {
            hotel.rooms?.map((e) => {
              if (e.roomId == roomId) {
                e.photoUrls = value.photoUrls;
              }
            });
          }
        );
      },
      error: (err) => {
        let message = '';
        err['error']['errors'].map((e: string) => message += e + '\n');
        this.matDialog.open(AlertDialogComponent, {
          data: {
            title: 'Error',
            message: message
          }
        });
      },
    });
  }
  matDialog!: MatDialog;
  // localStorage.setItem('hotelToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNzM2NjhkMy05MGM1LTRmOGYtYjA2NS0wNzVjYTZiNDcwN2MiLCJqdGkiOiJiN2VlNDY2MS0wYzJjLTRkMDUtYjgwNi01NWFlZmU5NmIxZTYiLCJlbWFpbCI6InNhcmEuYWhtZWRAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJIb3RlbCIsInJvbGVzIjoiSG90ZWwiLCJleHAiOjE3NTU1NDIyMjEsImlzcyI6IkVneXB0VHJpcEFwaSIsImF1ZCI6IkVneXB0VHJpcEFwaSJ9.CrmD7MfOII_fsj_EfAZapPyUEa7wbwcp2SsqOqWufuo');
  deleteRoom(roomId: string) {
    const token = this.authService.userValue?.token;
    let headers = undefined;
    if (token) {
      headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return this.client.delete<Room>(this.baseUrl + 'rooms/' + roomId, { headers }).pipe(tap(r => {
      this.roomsSubject.subscribe(
        (rooms) => {
          rooms = rooms.filter((e) => e.roomId != roomId);
          this.roomsSubject.next(rooms);
        }
      )
    }));


  }

  hotelId = '';
  addNewRoom(formData: FormData): Observable<Room> {
    const token = this.authService.userValue?.token;
    let headers = undefined;
    if (token) {
      headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return this.client.post<Room>(this.baseUrl + 'Hotels/' + this.hotelId + '/rooms', formData, { headers });
  }

  hotelDashBoardSubject = new ReplaySubject<HotelDashBoard>();
  hotelDashBoard$ = this.hotelDashBoardSubject.asObservable();

  roomsSubject = new ReplaySubject<Room[]>();
  roomsDashBoard$ = this.roomsSubject.asObservable();

  baseUrl = '/api/';


  constructor(private client: HttpClient, private authService: AuthService) {
    this.matDialog = inject(MatDialog);
    // localStorage.setItem('hotelToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNzM2NjhkMy05MGM1LTRmOGYtYjA2NS0wNzVjYTZiNDcwN2MiLCJqdGkiOiJiN2VlNDY2MS0wYzJjLTRkMDUtYjgwNi01NWFlZmU5NmIxZTYiLCJlbWFpbCI6InNhcmEuYWhtZWRAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJIb3RlbCIsInJvbGVzIjoiSG90ZWwiLCJleHAiOjE3NTU1NDIyMjEsImlzcyI6IkVneXB0VHJpcEFwaSIsImF1ZCI6IkVneXB0VHJpcEFwaSJ9.CrmD7MfOII_fsj_EfAZapPyUEa7wbwcp2SsqOqWufuo');
  }


  getHotelDashBoard() {
    const token = this.authService.userValue?.token;
    let headers = undefined;
    if (token) {
      headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    this.client.get<HotelDashBoard>(this.baseUrl + 'Dashboard/hotel', { headers }).pipe(take(1)).subscribe(
      {
        next: (value) => {
          this.hotelId = value.hotel?.hotelID!;
          this.hotelDashBoardSubject.next(value);
          this.roomsSubject.next(value.rooms!);
        },
        error: (err) => {
          this.hotelDashBoardSubject.error(err);
        }
      }
    );
  }
}
