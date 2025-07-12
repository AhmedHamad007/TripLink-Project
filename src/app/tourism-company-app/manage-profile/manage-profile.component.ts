import { TourismCompanyNavbarComponent } from './../tourism-company-navbar/tourism-company-navbar.component';
import { Component } from '@angular/core';
import { Profile } from './profile';

@Component({
  selector: 'app-manage-profile',
  imports: [TourismCompanyNavbarComponent],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export class ManageProfileComponent {
  profileData: Profile = {
    name: "abdo",
    license: 2345753,
    description: "My Company works in everything",
    address: "Alex,Egypt",
    email: "Abdo@moakt.co",
    phone: 123456789,
  }
}
