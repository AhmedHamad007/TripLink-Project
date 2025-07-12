import { Routes } from '@angular/router';
import { HomeComponent } from './landing-app/Components/home/home.component';
import { TourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guides.component';
import { AllHotelsComponent } from './client-app/Features/Hotels/main-page/Components/all-hotels/all-hotels.component';
import { HotelsDetailsComponent } from './client-app/Features/Hotels/main-page/Components/hotels-details/hotels-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Tour Guides', component: TourGuidesComponent },
    { path: 'hotel-reservation', component: AllHotelsComponent },
    { path: 'hotel-reservation/:hotelName', component: HotelsDetailsComponent },
    { path: '', redirectTo: '/hotel-reservation', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
