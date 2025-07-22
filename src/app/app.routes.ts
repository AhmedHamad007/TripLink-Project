import { RedirectToDashboardGuardService } from './auth-service/Services/AuthGuard/redirect-to-dashboard-guard.service';
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
import { AuthGuardService, redirectToDashboardGuard } from './auth-service/Services/AuthGuard/auth-guard.service';
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
import { OverviewComponent } from './tour-guides-app/overview/overview.component';
import { TourGuidesMainComponent } from './tour-guides-app/tour-guides-component/tour-guides-component.component';
import { ManagerTourGuideProfileComponent } from './tour-guides-app/manager-tour-guide-profile/manager-tour-guide-profile.component';
import { HotelComponent } from './hotels-app/hotel-component/hotel-component.component';
import { ManageHotelProfileComponent } from './hotels-app/manager-hotel-profile/manage-hotel-profile.component';
import { CreateRoomComponent } from './hotels-app/create-room/create-room.component';
import { ManageRoomsComponent } from './hotels-app/manage-rooms/manage-rooms.component';
import { RoomsViewComponent } from './hotels-app/manage-rooms/rooms-view/rooms-view.component';
import { RoomsTableComponent } from './hotels-app/manage-rooms/rooms-table/rooms-table.component';
import { ManageRoomComponent } from './hotels-app/manage-rooms/manage-room/manage-room.component';
import { HotelDashboardComponent } from './hotels-app/hotel-dashboard/hotel-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'Tour Guides', component: TourGuidesComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'hotel-reservation', component: AllHotelsComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'hotel-details/:hotelId', component: HotelsDetailsComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'hotel-booking', component: HotelBookingComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'room-details/:roomId', component: RoomDetailsComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'tour-guides', component: TourGuidesComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'top-tour-guides', component: TopTourGuidesComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'tour-guide-details/:guideId', component: TourGuideDetailsComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'tourguide-booking', component: TourGuideBookingComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'tour-packages', component: TourPackagesComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'package-details/:packageId', component: PackageDetailsComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'package-booking/:packageId', component: PackageBookingComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'register' , component : RegisterComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'register/tourism-company', component: RegisterTourismCompanyComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'register/tourist-guide', component: RegisterTouristGuideComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'register/Tourist', component: RegisterTouristComponent, canActivate: [redirectToDashboardGuard] },
  { path: 'register/hotel', component: RegisterHotelComponent, canActivate: [redirectToDashboardGuard] },
  { path : 'login' , component : LoginComponent, canActivate: [redirectToDashboardGuard] },
  
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
  {
    path: 'tour-guide',
    component: TourGuidesMainComponent,
    canActivate: [AuthGuardService],
    data: { role: 'TourGuide' },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent, title: 'TourGuide DashBoard' },
      { path: 'profile', component: ManagerTourGuideProfileComponent, title: 'Manage Profile' },
    ]
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
  {
    path: 'hotel',
    component: HotelComponent,
    canActivate: [AuthGuardService],
    data: { role: 'Hotel' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HotelDashboardComponent },
      { path: 'profile', component: ManageHotelProfileComponent },
      { path: 'new-room', component: CreateRoomComponent },
      {
        path: 'rooms',
        component: ManageRoomsComponent,
        children: [
          {
            path: '',
            component: RoomsViewComponent,
            children: [
              {
                path: '',
                component: RoomsTableComponent,
                pathMatch: 'full'
              },
              {
                path: ':id',
                pathMatch: 'full',
                component: ManageRoomComponent,
                resolve: {
                  id: (route: any) => route.paramMap.get('id')
                }
              }
            ]
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
