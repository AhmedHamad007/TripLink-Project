import { OverviewComponent } from './tour-guides-app/overview/overview.component';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './landing-app/Components/home/home.component';
import { TourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guides.component';
import { AllHotelsComponent } from './client-app/Features/Hotels/main-page/Components/all-hotels/all-hotels.component';
import { HotelsDetailsComponent } from './client-app/Features/Hotels/main-page/Components/hotels-details/hotels-details.component';
import { DashboardComponent } from './tourism-company-app/dashboard/dashboard.component';
import { ManageBookingsComponent } from './tourism-company-app/manage-bookings/manage-bookings.component';
import { EditPackageComponent } from './tourism-company-app/edit-package/edit-package.component';
import { ResolveFn } from '@angular/router';
import { NewListingComponent } from './tour-guides-app/new-listing/new-listing.component';
import { BookingRequestComponent } from './tour-guides-app/booking-request/booking-request.component';
import { TourismCompanyComponent } from './tourism-company-app/tourism-company-component/tourism-company-component';
import { inject } from '@angular/core';
import { CompanyService } from './tourism-company-app/services/company.service';
import { CreatePackageComponent } from './tourism-company-app/create-package/create-package.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Tour Guides', component: TourGuidesComponent },
    { path: 'hotel-reservation', component: AllHotelsComponent },
    { path: 'hotel-reservation/:hotelName', component: HotelsDetailsComponent },
    { path: 'tour-guide-overview', component: OverviewComponent },
    { path: 'tour-guide-listing', component: NewListingComponent },
    { path: 'tour-guide-booking', component: BookingRequestComponent },
    {
        path: 'company',
        component: TourismCompanyComponent,
        children: [
            {
                path: 'new-package', component: CreatePackageComponent,
            },
            {
                path: 'dashboard', component: DashboardComponent, resolve: {
                    packages: () => {
                        return inject(CompanyService).getCompanyPackages("e252c219-635c-4d18-bbf9-5c1573c94a77");
                    }
                }
            },
            {
                path: 'bookings', component: ManageBookingsComponent,
                resolve: {
                    bookings: () => {
                        return inject(CompanyService).getCompanyBookings("khaled.mahmoud@example.com");
                    },
                },
            },

            {
                path: 'edit-package/:id', component: EditPackageComponent, resolve: {
                    package: (route: ActivatedRouteSnapshot) => {
                        return route.paramMap.get('id')!;
                    }
                }
            },
        ],
    },
    { path: '', redirectTo: '/hotel-reservation', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
