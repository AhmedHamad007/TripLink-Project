import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsServiceService } from '../../Services/hotels-service.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../../../../shared-app/Components/navbar/navbar.component";

@Component({
  selector: 'app-hotels-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './hotels-details.component.html',
  styleUrls: ['./hotels-details.component.scss']
})
export class HotelsDetailsComponent implements OnInit {
  hotel: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelsServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const hotelNameSlug = params.get('hotelName');
      if (hotelNameSlug) {
        const hotelName = hotelNameSlug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        this.hotel = this.hotelService.getHotelByName(hotelName);
        console.log('Hotel data:', this.hotel);
        
        if (!this.hotel) {
          this.router.navigate(['/hotel-reservation']);
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/hotel-reservation']);
  }

  getStarRatingArray(starRating: number): number[] {
    return Array(starRating).fill(0);
  }

  getEmptyStarRatingArray(starRating: number): number[] {
    return Array(5 - starRating).fill(0);
  }
}