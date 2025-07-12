import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TouristNavbarComponent } from './Components/tourist-navbar/tourist-navbar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule , NavbarComponent , RouterModule , TouristNavbarComponent 
  ],
  exports : [NavbarComponent , TouristNavbarComponent]
})
export class SharedAppModule { }
