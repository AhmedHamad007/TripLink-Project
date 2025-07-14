import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../../shared-app/Components/navbar/navbar.component";

@Component({
  selector: 'app-register',
  imports: [RouterModule, NavbarComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
