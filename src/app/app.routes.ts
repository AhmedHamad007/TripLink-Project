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
import { HotelDashboardComponent } from './hotels-app/components/hotel-dashboard/hotel-dashboard.component';
import { AuthGuardService } from './auth-service/Services/AuthGuard/auth-guard.service';
import { PackageDetailsComponent } from './client-app/Features/tour-packages/package-details/package-details.component';
import { HotelBookingComponent } from './client-app/Features/Hotels/main-page/Components/hotel-booking/hotel-booking.component';
import { RoomDetailsComponent } from './client-app/Features/Hotels/main-page/Components/room-details/room-details.component';
import { TopTourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/top-tour-guides/top-tour-guides.component';
import { TourGuideBookingComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guide-booking/tour-guide-booking.component';
import { TourGuideDetailsComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guide-details/tour-guide-details.component';
import { PackageBookingComponent } from './client-app/Features/tour-packages/package-booking/package-booking.component';
import { TourPackagesComponent } from './client-app/Features/tour-packages/tour-packages.component';
import { HotelDetailsComponent } from './tourist-app/components/hotel-details/hotel-details.component';
import { HotelOffersComponent } from './tourist-app/components/hotel-offers/hotel-offers.component';
import { TourGuideOffersComponent } from './tourist-app/components/tour-guide-offers/tour-guide-offers.component';
import { TouristBookingsComponent } from './tourist-app/components/tourist-bookings/tourist-bookings.component';
import { TouristMessagesComponent } from './tourist-app/components/tourist-messages/tourist-messages.component';
import { TouristTripsComponent } from './tourist-app/components/tourist-trips/tourist-trips.component';
import { CreatePackageComponent } from './tourism-company-app/components/create-package/create-package.component';
import { DashboardComponent } from './tourism-company-app/components/dashboard/dashboard.component';
import { EditPackageComponent } from './tourism-company-app/components/edit-package/edit-package.component';
import { ManageBookingsComponent } from './tourism-company-app/components/manage-bookings/manage-bookings.component';
import { ProfileComponent } from './tourism-company-app/components/profile/profile.component';

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
  { path: 'register/Tourist', component: RegisterTouristComponent },
  { path: 'register/hotel', component: RegisterHotelComponent },
  { path : 'login' , component : LoginComponent},
  
  { path: 'dashboard/tourist', 
    component: TouristDashboardComponent, 
    canActivate: [AuthGuardService], 
    data: { role: 'Tourist' } 
  },
  { path: 'dashboard/tourist/bookings',
    component: TouristBookingsComponent,
    canActivate: [AuthGuardService],
    data: { role: 'Tourist' }
  },
  { path: 'dashboard/tourist/trips',
    component: TouristTripsComponent,
    canActivate: [AuthGuardService],
    data: { role: 'Tourist' }
  },
  { path: 'dashboard/tourist/messages',
    component: TouristMessagesComponent,
    canActivate: [AuthGuardService],
    data: { role: 'Tourist' }
  },
  { path: 'dashboard/tourist/hotel-offers',
    component: HotelOffersComponent,
    canActivate: [AuthGuardService],
    data: { role: 'Tourist' }
  },
  { path: 'dashboard/tourist/hotel-details/:hotelId',
    component: HotelDetailsComponent,
    canActivate: [AuthGuardService],
    data: { role: 'Tourist' }
  },
  { path: 'dashboard/tourist/guide-offers', component: TourGuideOffersComponent, canActivate: [AuthGuardService], data: { role: 'Tourist' } },
  { path: 'dashboard/tourist/bookings', component: TouristBookingsComponent, canActivate: [AuthGuardService], data: { role: 'Tourist' } },
  { path: 'dashboard/tourist/trips', component: TouristTripsComponent, canActivate: [AuthGuardService], data: { role: 'Tourist' } },
  { path: 'dashboard/tourist/messages', component: TouristMessagesComponent, canActivate: [AuthGuardService], data: { role: 'Tourist' } },
// 
  { path: 'dashboard/tourist-guide', 
    component: TourGuideDashboardComponent, 
    canActivate: [AuthGuardService], 
    data: { role: 'TourGuide' } 
  },
  //
  
   { 
    path: 'dashboard/tourism-company', 
    component: DashboardComponent, 
    canActivate: [AuthGuardService], 
    data: { role: 'TourismCompany' }
  },
   { path: 'dashboard/tourism-company/new-package', 
    component: CreatePackageComponent, 
    canActivate: [AuthGuardService], 
    data: { role: 'TourismCompany' }
  },
   { path: 'dashboard/tourism-company/bookings', 
    component: ManageBookingsComponent, 
    canActivate: [AuthGuardService], 
    data: { role: 'TourismCompany' }
  },
   { path: 'dashboard/tourism-company/edit-package/:id', 
    component: EditPackageComponent, 
    canActivate: [AuthGuardService], 
    data: { role: 'TourismCompany' }
  },
  { path: 'dashboard/tourism-company/profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuardService], 
    data: { role: 'TourismCompany' } 
  },
  { path: 'dashboard/hotel', 
    component: HotelDashboardComponent, 
    canActivate: [AuthGuardService], 
    data: { role: 'Hotel' } 
  },
  { path: '**', redirectTo: 'tour-guides' }
];
