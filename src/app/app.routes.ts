import { Routes } from '@angular/router';
import { HomeComponent } from './landing-app/Components/home/home.component';
import { TourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guides.component';
import { AllTourGudiesComponent } from './client-app/Features/Tour-Guides/tour-guides/all-tour-gudies/all-tour-gudies.component';

export const routes: Routes = [
    {path : '' , component : HomeComponent},
    {path : 'Tour Guides', component : TourGuidesComponent},
    {path : '**' , redirectTo : ''}
];
