import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterHotelComponent } from './Components/register-hotel/register-hotel.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule , RouterModule , RegisterHotelComponent
  ],
  exports : [RegisterHotelComponent]
})
export class AuthServiceModule { }
