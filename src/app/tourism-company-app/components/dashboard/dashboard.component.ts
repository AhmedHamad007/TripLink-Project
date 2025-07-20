import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Package } from '../interfaces/package';
import { CompanyService } from '../services/company.service';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../auth-service/Services/Auth/auth.service';
import { TourismCompanyNavbarComponent } from "../tourism-company-navbar/tourism-company-navbar.component";
@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule, TourismCompanyNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CompanyService, private dialog: MatDialog, private authService: AuthService) { }


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
    const user = this.authService.userValue;
    if (user) {
      this.service.getCompanyPackages();
      this.service.getCompanyBookings(user.email);
      this.name = user.email;
    }
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