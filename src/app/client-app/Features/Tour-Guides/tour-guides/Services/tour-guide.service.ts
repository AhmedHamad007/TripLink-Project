import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TourGuide } from '../interfaces/tour-guide';

@Injectable({
  providedIn: 'root'
})
export class TourGuideService {
private apiUrl = '/api/TourGuides';

  constructor(private http: HttpClient) {}

  getAllTourGuides(): Observable<TourGuide[]> {
    return this.http.get<TourGuide[]>(this.apiUrl).pipe(
      tap(response => console.log('API Response (GetAllTourGuides):', response)),
      catchError(this.handleError)
    );
  }

  getTourGuideById(guideId: string): Observable<TourGuide> {
    return this.http.get<TourGuide>(`${this.apiUrl}/${guideId}`).pipe(
      tap(response => console.log('API Response (GetTourGuideById):', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching tour guide data.';
    if (error.error && typeof error.error === 'object' && 'message' in error.error) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (error.error && error.error.Errors && Array.isArray(error.error.Errors)) {
      errorMessage = `Server Error: ${error.error.Errors.join(', ')}`;
    } else if (error.error && typeof error.error === 'string') {
      errorMessage = `Server Error: ${error.error}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message || 'Unknown error'}`;
    }
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
