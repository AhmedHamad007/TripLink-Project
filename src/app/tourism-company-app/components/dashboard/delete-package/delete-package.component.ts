import { map } from 'rxjs';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { log } from 'node:console';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-delete-package',
  imports: [],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.scss'
})
export class DeletePackageComponent implements OnInit {

  constructor(private service: CompanyService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeletePackageComponent>,) { }
  ngOnInit(): void {
    this.id = this.data.id;
  }
  id!: string;

  confirm() {
    this.service.deletePackage(this.id).subscribe(
      {
        next: (val) => {
          alert("Package is Deleted Successful");
        },
        error: (error) => {
          error.map((e: any) => {
            alert(e.message);
          });
        }
      }
    )
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}