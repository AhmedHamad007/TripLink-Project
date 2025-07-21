import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Package } from '../interfaces/package';
import { CompanyService } from '../services/company.service';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertDialogComponent } from '../../alert-dialog-component/alert-dialog-component';
@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CompanyService, private matDialog: MatDialog) { }

  isBookingsReqFinished = false;
  isPackagesReqFinished = false;

  ngOnInit(): void {
    this.service.packages$.subscribe(
      {
        next: (val) => {
          console.log(val);
          this.packages = val;
          this.numberOfPackages = this.packages.length;
          this.isPackagesReqFinished = true;
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
    );
    this.service.bookings$.subscribe(
      {
        next: (val) => {
          this.activeBookingsNumber = val.length;
          this.price = 0;
          val.map((booking) => {
            this.price += booking.totalPrice;
          });
          this.isBookingsReqFinished = true;
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
    );
    this.service.getCompanyPackages("72a46972-93a8-4960-9b45-a6affa1cafb4");
    this.service.getCompanyBookings("khaled.mahmoud@example.com");
  }

  name: string = "Aisha";

  packages!: Package[];

  activeBookingsNumber: number = 0;

  price: number = 0;

  numberOfPackages!: number;

  openDeleteDialog(packageId: string, itemName: string): void {
    this.matDialog.open(DeletePackageComponent, {
      data: { id: packageId, itemName: itemName }
    });
  }

  toFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    return formData;
  }
}