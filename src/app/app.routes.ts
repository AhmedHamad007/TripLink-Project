import { HomeComponent } from './landing-app/Components/home/home.component';
import { TourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guides.component';
import { HotelsDetailsComponent } from './client-app/Features/Hotels/main-page/Components/hotels-details/hotels-details.component';
import { AllHotelsComponent } from './client-app/Features/Hotels/main-page/Components/all-hotels/all-hotels.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './landing-app/Components/register/register.component';
import { RegisterTourismCompanyComponent } from './auth-service/Components/register-tourism-company/register-tourism-company.component';
import { RegisterTouristGuideComponent } from './auth-service/Components/register-tourist-guide/register-tourist-guide.component';
import { RegisterHotelComponent } from './auth-service/Components/register-hotel/register-hotel.component';
import { LoginComponent } from './auth-service/Components/login/login.component';
import { RegisterTouristComponent } from './auth-service/Components/register-tourist/register-tourist.component';
import { TouristDashboardComponent } from './tourist-app/components/tourist-dashboard/tourist-dashboard.component';
import { TourGuideDashboardComponent } from './tour-guides-app/components/tour-guide-dashboard/tour-guide-dashboard.component';
import { TourismCompanyDashboardComponent } from './tourism-company-app/components/tourism-company-dashboard/tourism-company-dashboard.component';
import { HotelDashboardComponent } from './hotels-app/components/hotel-dashboard/hotel-dashboard.component';
import { AuthGuardService } from './auth-service/Services/AuthGuard/auth-guard.service';
import { RoomDetailsComponent } from './client-app/Features/Hotels/main-page/Components/room-details/room-details.component';
import { TopTourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/top-tour-guides/top-tour-guides.component';
import { TourGuideDetailsComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guide-details/tour-guide-details.component';
import { HotelBookingComponent } from './client-app/Features/Hotels/main-page/Components/hotel-booking/hotel-booking.component';
import { TourGuideBookingComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guide-booking/tour-guide-booking.component';
import { AllPackagesComponent } from './client-app/Features/tour-packages/all-packages/all-packages.component';
import { TourPackagesComponent } from './client-app/Features/tour-packages/tour-packages.component';
import { PackageDetailsComponent } from './client-app/Features/tour-packages/package-details/package-details.component';
import { PackageBookingComponent } from './client-app/Features/tour-packages/package-booking/package-booking.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Tour Guides', component: TourGuidesComponent },
  { path: 'hotel-reservation', component: AllHotelsComponent },
  { path: 'hotel-details/:hotelId', component: HotelsDetailsComponent },
  { path: 'hotel-booking', component: HotelBookingComponent },
  { path: 'room-details/:roomId', component: RoomDetailsComponent },
  { path: 'tour-guides', component: TourGuidesComponent },
  { path: 'top-tour-guides', component: TopTourGuidesComponent },
  { path: 'tour-guide-details/:guideId', component: TourGuideDetailsComponent },
  { path: 'tourguide-booking', component: TourGuideBookingComponent },
  { path: 'tour-packages', component: TourPackagesComponent },
  { path: 'package-details/:packageId', component: PackageDetailsComponent },
  { path: 'package-booking/:packageId', component: PackageBookingComponent },
  { path: 'register' , component : RegisterComponent},
  { path: 'register/tourism-company', component: RegisterTourismCompanyComponent },
  { path: 'register/tourist-guide', component: RegisterTouristGuideComponent },
  { path: 'register/tourist', component: RegisterTouristComponent },
  { path: 'register/hotel', component: RegisterHotelComponent },
  { path : 'login' , component : LoginComponent},
  { path: 'dashboard/tourist',component: TouristDashboardComponent, canActivate: [AuthGuardService], 
    data: { role: 'tourist' } 
  },
  { path: 'dashboard/tourist-guide',component: TourGuideDashboardComponent,canActivate: [AuthGuardService], 
    data: { role: 'tourist_guide' } 
  },
  { path: 'dashboard/tourism-company',component: TourismCompanyDashboardComponent,canActivate: [AuthGuardService], 
    data: { role: 'tourism_company' } 
  },
  { path: 'dashboard/hotel', 
    component: HotelDashboardComponent,canActivate: [AuthGuardService],data: { role: 'hotel' } 
  },
  { path: '**', redirectTo: '' }
];