import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../../../../../../shared-app/Components/navbar/navbar.component';
import { HotelsServiceService } from '../../Services/hotels-service.service';

@Component({
  selector: 'app-all-hotels',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.scss']
})
export class AllHotelsComponent implements OnInit {
  allProducts: any[] = [];
  showedProducts: any[] = [];
  city: string = 'All';
  starRating: string = 'All';
  price: string = 'All';

  constructor(private hotelService: HotelsServiceService, private router: Router) {}

  ngOnInit(): void {
    this.allProducts = this.hotelService.getHotels();
    this.showedProducts = [...this.allProducts];
    console.log('Initial products:', this.allProducts);
  }

  updateFilter(event: Event, filterType: string): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    if (filterType === 'city') {
      this.city = value;
    } else if (filterType === 'starRating') {
      this.starRating = value;
    } else if (filterType === 'price') {
      this.price = value;
    }

    console.log(`Filter updated: city=${this.city}, starRating=${this.starRating}, price=${this.price}`);
    this.filterData();
  }

  filterData(): void {
    this.showedProducts = [...this.allProducts];

    console.log('Filtering with:', { city: this.city, starRating: this.starRating, price: this.price });

    if (this.city !== 'All') {
      this.showedProducts = this.showedProducts.filter(e => e.city === this.city);
    }

    if (this.starRating !== 'All') {
      const starRatingNum = parseInt(this.starRating);
      this.showedProducts = this.showedProducts.filter(e => e.starRating === starRatingNum);
    }

    if (this.price !== 'All') {
      if (this.price === 'Above 500$') {
        this.showedProducts = this.showedProducts.filter(e => e.price > 500);
      } else if (this.price === '300$-500$') {
        this.showedProducts = this.showedProducts.filter(e => e.price > 300 && e.price <= 500);
      } else if (this.price === 'Less Than 300$') {
        this.showedProducts = this.showedProducts.filter(e => e.price < 300);
      }
    }

    console.log('Filtered products:', this.showedProducts);
  }

  getHotelSlug(hotelName: string): string {
    return hotelName.toLowerCase().replace(/\s+/g, '-');
  }

  goToDetails(index: number): void {
    const hotel = this.showedProducts[index];
    this.hotelService.setSelectedHotel(hotel);
    const hotelNameSlug = this.getHotelSlug(hotel.hotel);
    this.router.navigate(['/hotel-reservation', hotelNameSlug]);
  }

  getStarRatingArray(starRating: number): number[] {
    return Array(starRating).fill(0);
  }

  getEmptyStarRatingArray(starRating: number): number[] {
    return Array(5 - starRating).fill(0);
  }
}