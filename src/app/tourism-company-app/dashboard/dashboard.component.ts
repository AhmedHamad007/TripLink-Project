import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Package } from '../interfaces/package';
import { CompanyService } from '../services/company.service';
import { DeletePackageComponent } from './delete-package/delete-package.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CompanyService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.service.packages$.subscribe(
      {
        next: (val) => {
          this.packages = val;
          this.numberOfPackages = this.packages.length;
        },
        error: (err) => {
          alert(err);
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
        },
        error: (err) => {
          alert(err);
        }
      }
    );
    this.service.getCompanyPackages("e252c219-635c-4d18-bbf9-5c1573c94a77");
    this.service.getCompanyBookings("khaled.mahmoud@example.com");
  }

  name: string = "Aisha";

  packages!: Package[];

  activeBookingsNumber: number = 0;

  price: number = 0;

  numberOfPackages!: number;

  openDeleteDialog(packageId: string): void {
    this.dialog.open(DeletePackageComponent, {
      data: { id: packageId }
    });
  }
}