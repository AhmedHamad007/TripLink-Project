import { Hotel, HotelDashBoard, Room } from './interfaces/hotel-dashboard';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private baseUrl = '/api/';
  matDialog!: MatDialog;
  hotelId = '';
  hotelDashBoardSubject = new ReplaySubject<HotelDashBoard>();
  hotelDashBoard$ = this.hotelDashBoardSubject.asObservable();
  roomsSubject = new ReplaySubject<Room[]>();
  roomsDashBoard$ = this.roomsSubject.asObservable();

  constructor(private client: HttpClient) {
    this.matDialog = inject(MatDialog);
  }

  editProfile(formData: FormData, hotelId: string): Observable<Hotel> {
    return this.client.put<Hotel>(this.baseUrl + 'Hotels/' + hotelId, formData);
  }

  editRoom(room: FormData, roomId: string): Observable<Room> {
    return this.client.put<Room>(this.baseUrl + 'rooms/' + roomId, room);
  }

  deleteRoom(roomId: string): Observable<Room> {
    return this.client.delete<Room>(this.baseUrl + 'rooms/' + roomId).pipe(
      tap(r => {
        this.roomsSubject.subscribe(
          (rooms) => {
            rooms = rooms.filter((e) => e.roomId != roomId);
            this.roomsSubject.next(rooms);
          }
        )
      })
    );
  }

  addNewRoom(formData: FormData): Observable<Room> {
    return this.client.post<Room>(this.baseUrl + 'Hotels/' + this.hotelId + '/rooms', formData);
  }

  getHotelDashBoard(): Observable<HotelDashBoard> {
    return this.client.get<HotelDashBoard>(this.baseUrl + 'Dashboard/hotel').pipe(
      take(1),
      tap({
        next: (value) => {
          this.hotelId = value.hotel?.hotelID!;
          this.hotelDashBoardSubject.next(value);
          this.roomsSubject.next(value.rooms!);
        },
        error: (err) => {
          this.hotelDashBoardSubject.error(err);
        }
      })
    );
  }
}
