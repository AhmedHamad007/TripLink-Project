import { DashBoard } from './tour-guides-app/interfaces/dashboard';

import { OverviewComponent } from './tour-guides-app/overview/overview.component';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './landing-app/Components/home/home.component';
import { TourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guides.component';
import { AllHotelsComponent } from './client-app/Features/Hotels/main-page/Components/all-hotels/all-hotels.component';
import { HotelsDetailsComponent } from './client-app/Features/Hotels/main-page/Components/hotels-details/hotels-details.component';
import { DashboardComponent } from './tourism-company-app/dashboard/dashboard.component';
import { ManageBookingsComponent } from './tourism-company-app/manage-bookings/manage-bookings.component';
import { EditPackageComponent } from './tourism-company-app/edit-package/edit-package.component';
import { TourismCompanyComponent } from './tourism-company-app/tourism-company-component/tourism-company-component';
import { CreatePackageComponent } from './tourism-company-app/create-package/create-package.component';
import { TourGuidesMainComponent } from './tour-guides-app/tour-guides-component/tour-guides-component.component';
import { ManagerTourGuideProfileComponent } from './tour-guides-app/manager-tour-guide-profile/manager-tour-guide-profile.component';
import { HotelComponent } from './hotels-app/hotel-component/hotel-component.component';
import { HotelDashboardComponent } from './hotels-app/hotel-dashboard/hotel-dashboard.component';
import { ManageHotelProfileComponent } from './hotels-app/manager-hotel-profile/manage-hotel-profile.component';
import { ManageRoomsComponent } from './hotels-app/manage-rooms/manage-rooms.component';
import { ManageRoomComponent } from './hotels-app/manage-rooms/manage-room/manage-room.component';
import { RoomsTableComponent } from './hotels-app/manage-rooms/rooms-table/rooms-table.component';
import { RoomsViewComponent } from './hotels-app/manage-rooms/rooms-view/rooms-view.component';
import { CreateRoomComponent } from './hotels-app/create-room/create-room.component';
import { TouristDashboardComponent } from './tourist/dashboard/tourist.dashboard.component';
import { TouristProfileComponent } from './tourist/tourist-profile/tourist-profile.component';
import { EditBookingComponent } from './tourist/edit-booking/edit-booking.component';
import { LoginComponent } from './landing-app/Components/login/login.component';
import { RegisterComponent } from './landing-app/Components/register/register.component';
import { AuthGuard } from './landing-app/auth.guard';
import { CompanyRegisterComponent } from './landing-app/Components/register/company-register/company-register.component';
import { TourGuideRegisterComponent } from './landing-app/Components/register/tour-guide-register/tour-guide-register.component';
import { HotelRegisterComponent } from './landing-app/Components/register/hotel-register/hotel-register.component';
import { TouristRegisterComponent } from './landing-app/Components/register/tourist-register/tourist-register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Tour Guides', component: TourGuidesComponent },
    { path: 'hotel-reservation', component: AllHotelsComponent },
    {
        path: 'hotel-reservation/:hotelName', component: HotelsDetailsComponent,
        canActivate: [
            AuthGuard,
        ]
    },
    {
        path: 'tour-guide', component: TourGuidesMainComponent, children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },

            { path: 'overview', component: OverviewComponent, title: 'TourGuide DashBoard' },
            {
                path: 'profile', component: ManagerTourGuideProfileComponent, title: 'Manage Profile'
            },
        ]
        ,
        canActivate: [
            AuthGuard,
        ]
    },
    {
        path: 'company',
        component: TourismCompanyComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
                title: 'Company DashBoard'
            },
            {
                path: 'new-package', component: CreatePackageComponent,
                title: 'Create New Package'
            },
            {
                path: 'dashboard', component: DashboardComponent,
                title: 'Company DashBoard'
            },
            {
                path: 'bookings', component: ManageBookingsComponent,
                title: 'Manage Bookings'
            },

            {
                path: 'edit-package/:id', component: EditPackageComponent, resolve: {
                    package: (route: ActivatedRouteSnapshot) => {
                        return route.paramMap.get('id')!;
                    }
                },
                title: 'Edit Package',
            },
        ],

        canActivate: [
            AuthGuard,
        ]
    },
    {
        path: 'hotel',
        component: HotelComponent,
        children:
            [
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard', component: HotelDashboardComponent, },
                { path: 'profile', component: ManageHotelProfileComponent, },
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
                                        id: (route: ActivatedRouteSnapshot) => route.paramMap.get('id')
                                    }
                                }
                            ]
                        }
                    ]
                }

            ],

        canActivate: [
            AuthGuard,
        ]
    },
    {
        path: 'tourist/dashboard',
        component: TouristDashboardComponent,
        canActivate: [
            AuthGuard,
        ]
    },
    {
        path: 'tourist/',
        redirectTo: 'tourist/dashboard',
        pathMatch: 'full',
    },
    {
        path: 'tourist/profile',
        component: TouristProfileComponent,
        canActivate: [
            AuthGuard,
        ]
    },
    {
        path: 'tourist/edit-booking/:id',
        component: EditBookingComponent,
        resolve: {
            id: (route: ActivatedRouteSnapshot) => {
                return route.paramMap.get('id');
            }
        },
        canActivate: [
            AuthGuard,
        ]
    },
    { path: 'register', component: RegisterComponent },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register/company', component: CompanyRegisterComponent,
    },
    {
        path: 'register/guide', component: TourGuideRegisterComponent,
    },
    {
        path: 'register/hotel', component: HotelRegisterComponent,
    },
    {
        path: 'register/tourist', component: TouristRegisterComponent,
    },
    { path: '', redirectTo: '/hotel-reservation', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
