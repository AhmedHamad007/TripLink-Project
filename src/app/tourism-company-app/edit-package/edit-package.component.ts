import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Destination, Package } from '../interfaces/package';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertDialogComponent } from '../../alert-dialog-component/alert-dialog-component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-package',
  imports: [RouterModule, FormsModule, MatProgressSpinner],
  templateUrl: './edit-package.component.html',
  styleUrl: './edit-package.component.scss',
})
export class EditPackageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CompanyService, private matDialog: MatDialog) { }

  destinations: Destination[] = [];


  ngOnInit(): void {
    this.service.destinations$.subscribe(
      {
        next: (val) => {
          this.destinations = val;
        },
        error: (err) => {
          let message = '';
          err['error']['errors'].map((e: string) => message += e + '\n');
          this.matDialog.open(AlertDialogComponent, {
            data: {
              title: 'Error',
              message: message
            }
          });
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
              let message = '';
              err['error']['errors'].map((e: string) => message += e + '\n');
              this.matDialog.open(AlertDialogComponent, {
                data: {
                  title: 'Error',
                  message: message
                }
              });
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
        let message = '';
        err['error']['errors'].map((e: string) => message += e + '\n');
        this.matDialog.open(AlertDialogComponent, {
          data: {
            title: 'Error',
            message: message
          }
        });
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

  removeImage(photo: string) {
    this.package.photoUrls = this.package.photoUrls?.filter((e) => e != photo);
  }
}
