import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourGuidesComponent } from './Features/Tour-Guides/tour-guides/tour-guides.component';
import { RouterModule } from '@angular/router';
import { AllTourGudiesComponent } from './Features/Tour-Guides/tour-guides/all-tour-gudies/all-tour-gudies.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule , TourGuidesComponent , RouterModule , AllTourGudiesComponent 
  ],
  exports : [TourGuidesComponent , AllTourGudiesComponent]
})
export class ClientAppModule { }
