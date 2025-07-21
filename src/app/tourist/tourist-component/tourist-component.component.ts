import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TouristNavbarComponent } from '../tourism-navbar/tourism-company-navbar.component';

@Component({
  selector: 'app-tourist-component',
  imports: [RouterOutlet, TouristNavbarComponent],
  templateUrl: './tourist-component.component.html',
  styleUrl: './tourist-component.component.scss'
})
export class TouristComponent {

}
