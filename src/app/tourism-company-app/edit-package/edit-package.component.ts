import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TourismCompanyNavbarComponent } from "../tourism-company-navbar/tourism-company-navbar.component";
import { ActivatedRoute, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Destination, Package } from '../interfaces/package';
import { FormsModule } from '@angular/forms';
import { log } from 'console';


@Component({
  selector: 'app-edit-package',
  imports: [RouterModule, FormsModule],
  templateUrl: './edit-package.component.html',
  styleUrl: './edit-package.component.scss',
})
export class EditPackageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CompanyService) { }

  destinations: Destination[] = [];

  ngOnInit(): void {
    this.service.destinations$.subscribe(
      {
        next: (val) => {
          this.destinations = val;
        },
      }
    );
    this.route.data.subscribe(
      (complete) => {
        this.packageId = complete['package'];
        this.service.getPackageById(this.packageId).subscribe(
          {
            next: (val) => {
              this.package = val;
              this.package.destinationIds = [];
              this.package.destinationIds = this.package.destinations?.map(d => d.destinationId);
              console.log(this.package.destinationIds);

            },
            error: (err) => {
              alert(err);
            }
          }
        )
      }
    );
    this.service.getDestinations();
  }

  packageId!: string;

  package!: Package;

  saveData() {
    this.service.editPackage(this.package).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        alert(err);
      },
      complete: () => {
        alert("Package Update Successfully");
      }
    });
  }

  isDestinationChecked(id: string) {
    return this.package.destinationIds?.includes(id);
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
