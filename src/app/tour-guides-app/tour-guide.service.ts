import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashBoard } from './interfaces/dashboard';
import { TourGuide } from './interfaces/tour-guide';
import { AuthService } from '../auth-service/Services/Auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Destination } from '../client-app/Features/tour-packages/interfaces/destination';

@Injectable({
  providedIn: 'root'
})
export class TourGuideService {

  dashboardSubject = new BehaviorSubject<DashBoard>({});
  dashboard$ = this.dashboardSubject.asObservable();


  baseUrl: string = '/api';
  constructor(private client: HttpClient, private authService: AuthService) {
    // localStorage.setItem("tourGuideToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4YjdhNjMyOC0wNTU2LTQ1Y2MtYjcwOC1kYTA5Njg4OWVjMWIiLCJqdGkiOiJiMTMyZGIxNi1lMzJkLTRhNTYtOGMzZi1kNWNkZTAwMTczMWUiLCJlbWFpbCI6Im1vaGFtZWQuaGFzc2FuQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVG91ckd1aWRlIiwicm9sZXMiOiJUb3VyR3VpZGUiLCJleHAiOjE3NTU0NDE2NTAsImlzcyI6IkVneXB0VHJpcEFwaSIsImF1ZCI6IkVneXB0VHJpcEFwaSJ9.WzKX4XEWDaYHhMmgFNo-RImjUn7OoTLqsp57iGIiVF4");
  }

  getTourGuideDashBoard() {
    const token = this.authService.userValue?.token;
    let headers = undefined;
    if (token) {
      headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    this.client.get<DashBoard>(this.baseUrl + '/DashBoard/tourguide', { headers }).subscribe(
      (tourGuideDashBoard) => {
        this.dashboardSubject.next(tourGuideDashBoard);
      }
    );
  }

  editTourGuide(formData: FormData): Observable<TourGuide> {
    const token = this.authService.userValue?.token;
    let headers = undefined;
    if (token) {
      headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return this.client.put<TourGuide>(this.baseUrl + '/TourGuides/' + formData.get('guideID'), formData, { headers });
  }

  getDestinations(): Observable<Destination[]> {
    return this.client.get<Destination[]>(this.baseUrl + '/Destinations')
  }
}
