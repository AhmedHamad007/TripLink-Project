import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Tourist } from '../tourist';
import { TouristService } from '../tourist.service';
import { AlertDialogComponent } from '../../alert-dialog-component/alert-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { TouristNavbarComponent } from '../tourism-navbar/tourism-company-navbar.component';

@Component({
  selector: 'app-tourist-profile',
  imports: [MatProgressSpinner, FormsModule, TouristNavbarComponent],
  templateUrl: './tourist-profile.component.html',
  styleUrl: './tourist-profile.component.scss'
})
export class TouristProfileComponent implements OnInit {

  isTouristReqFinished = false;

  constructor(private matDialog: MatDialog) { }
  ngOnInit(): void {
    this.service.touristDashBoard$.subscribe(
      {
        next: (value) => {
          this.isTouristReqFinished = true;
          this.tourist = value;
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
    )
  }

  service = inject(TouristService);

  tourist!: Tourist;

  editProfile() {
    this.service.editProfile(this.tourist).subscribe({
      next: (value) => {
        // this.tourist.name = value.firstName;
      },
    });
  }
}
