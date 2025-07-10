import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourGuidesComponent } from './Features/Tour-Guides/tour-guides/tour-guides.component';
import { RouterModule } from '@angular/router';
import { AllTourGudiesComponent } from './Features/Tour-Guides/tour-guides/all-tour-gudies/all-tour-gudies.component';
import { MainPageComponent } from './Features/Hotels/main-page/main-page.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule , TourGuidesComponent , RouterModule , AllTourGudiesComponent  , MainPageComponent ,
  ],
  exports : [TourGuidesComponent , AllTourGudiesComponent , MainPageComponent]
})
export class ClientAppModule { }
