import { Package } from './../interfaces/package';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Destination } from '../interfaces/package';
import { FormsModule } from '@angular/forms';
import { log } from 'console';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { TourismCompanyNavbarComponent } from '../tourism-company-navbar/tourism-company-navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-package',
  imports: [FormsModule, TourismCompanyNavbarComponent],
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.scss'
})
export class CreatePackageComponent implements OnInit {

  constructor(private service: CompanyService, private authService: AuthService, private router: Router) { }

  destinations: Destination[] = [];

  package: Package = {
    packageId: '1',
    companyId: 'e252c219-635c-4d18-bbf9-5c1573c94a77',
    packageName: '',
    description: '',
    price: '',
    durationDays: 0,
    startDate: '',
    endDate: '',
    companyName: '',
    destinationIds: [
    ]
  };

  ngOnInit(): void {
    this.service.destinations$.subscribe({
      next: (value) => {
        this.destinations = value;
      },
    });
    this.service.getDestinations();
    // Set companyId and companyName from AuthService
    const user = this.authService.userValue;
    if (user) {
      this.package.companyName = user.email;
    }
  }

  createPackage() {
    this.package.durationDays = this.calculateDaysDifference(this.package.startDate, this.package.endDate);
    // companyId and companyName already set in ngOnInit
    console.log("dests ids : " + this.package.destinationIds);
    console.log("dests : " + this.package.destinations);

    this.service.createPackage(this.package).subscribe({
      next: (val) => {
        alert("Package Created Successfully!");
        // Force refresh packages before navigating
        this.service.getCompanyPackages();
        this.router.navigate(['/dashboard/tourism-company']);
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  calculateDaysDifference(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.ceil(diffInMilliseconds / millisecondsPerDay);

    return diffInDays;
  }

  addOrRemoveDestination(id: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;


    if (checkbox.checked) {
      if (!this.package.destinationIds?.includes(id)) {
        this.package.destinationIds?.push(id);
      }
    } else {
      this.package.destinationIds = this.package.destinationIds?.filter(destId => destId !== id);
    }
  }

}
