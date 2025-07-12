import { Component } from '@angular/core';
import { TourismCompanyNavbarComponent } from "../tourism-company-navbar/tourism-company-navbar.component";
import { Package } from './package';

@Component({
  selector: 'app-create-package',
  imports: [TourismCompanyNavbarComponent],
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.scss'
})
export class CreatePackageComponent {
  packageInfo!: Package;
}
