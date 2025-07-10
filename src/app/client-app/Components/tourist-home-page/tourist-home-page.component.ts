import { Component } from '@angular/core';
import { SharedAppModule } from "../../../shared-app/shared-app.module";
import { RouterOutlet } from "../../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-tourist-home-page',
  imports: [SharedAppModule, RouterOutlet],
  templateUrl: './tourist-home-page.component.html',
  styleUrl: './tourist-home-page.component.scss'
})
export class TouristHomePageComponent {

}
