import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  companyName: string;
  licenseNumber: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly serviceId = 'profile-service-' + Date.now();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getProfile(): Observable<ProfileData> {
    const user = this.authService.userValue;
    if (!user?.email) {
      throw new Error('No user logged in');
    }
    return this.http.get<ProfileData>(`/api/Account/profile/${user.email}`);
  }

  updateProfile(profileData: ProfileData): Observable<{ message: string; data: ProfileData }> {
    const user = this.authService.userValue;
    if (!user?.email) {
      throw new Error('No user logged in');
    }
    return this.http.put<{ message: string; data: ProfileData }>(`/api/Account/profile/${user.email}`, profileData);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ message: string }> {
    const user = this.authService.userValue;
    if (!user?.email) {
      throw new Error('No user logged in');
    }
    return this.http.put<{ message: string }>(`/api/Account/change-password`, {
      email: user.email,
      currentPassword,
      newPassword
    });
  }
} 