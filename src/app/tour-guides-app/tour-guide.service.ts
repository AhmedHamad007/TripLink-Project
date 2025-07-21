import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashBoard } from './interfaces/dashboard';
import { TourGuide } from './interfaces/tour-guide';
import { Destination } from '../client-app/Features/tour-packages/interfaces/destination';

@Injectable({
  providedIn: 'root'
})
export class TourGuideService {
  private baseUrl: string = '/api';

  constructor(private client: HttpClient) {}

  getTourGuideDashBoard(): Observable<DashBoard> {
    return this.client.get<DashBoard>(`${this.baseUrl}/DashBoard/tourguide`);
  }

  editTourGuide(formData: FormData): Observable<TourGuide> {
    const guideId = formData.get('guideID');
    return this.client.put<TourGuide>(`${this.baseUrl}/TourGuides/${guideId}`, formData);
  }

  getDestinations(): Observable<Destination[]> {
    return this.client.get<Destination[]>(`${this.baseUrl}/Destinations`);
  }

  getAllTourGuides(): Observable<TourGuide[]> {
    return this.client.get<TourGuide[]>(`${this.baseUrl}/TourGuides`);
  }

  getTourGuideById(guideId: string): Observable<TourGuide> {
    return this.client.get<TourGuide>(`${this.baseUrl}/TourGuides/${guideId}`);
  }
}
