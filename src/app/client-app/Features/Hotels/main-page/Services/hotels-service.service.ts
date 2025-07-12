import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelsServiceService {
  private selectedHotel: any;

  private allProducts = [
    {
      hotel: "Grand Palace Hotel",
      city: "New York",
      price: 550,
      starRating: 5,
      description: "Experience luxury at its finest in the heart of Manhattan. Our Grand Palace Hotel offers world-class amenities, stunning city views, and exceptional service that will make your stay unforgettable.",
      images: ['https://tuhmxvun.manus.space/assets/hotel1-DblUoNlc.jpg', 'https://tuhmxvun.manus.space/assets/hotel2-DOKstNFX.jpg', 'https://tuhmxvun.manus.space/assets/hotel3-NddmshxU.jpg'],
      amenities: [
        { name: "Free Wifi", icon: `<i class="fa-solid fa-wifi"></i>` },
        { name: "Water", icon: `<i class="fa-solid fa-water"></i>` },
        { name: "Spa", icon: `<i class="fa-solid fa-spa"></i>` },
        { name: "Gym", icon: `<i class="fa-solid fa-dumbbell"></i>` },
        { name: "Restaurant", icon: `<i class="fa-solid fa-utensils"></i>` },
        { name: "Room Service", icon: `<i class="fa-solid fa-bell-concierge"></i>` },
        { name: "Concierge", icon: `<i class="fa-solid fa-burger"></i>` }
      ]
    },
    {
      hotel: "Ocean View Resort",
      city: "Miami",
      price: 220,
      starRating: 4,
      description: "Wake up to breathtaking ocean views every morning at our beachfront resort. Perfect for both relaxation and adventure, with direct beach access and premium facilities.",
      images: ['https://tuhmxvun.manus.space/assets/hotel2-DOKstNFX.jpg', 'https://tuhmxvun.manus.space/assets/hotel4-BM2_Ks_P.jpg', 'https://tuhmxvun.manus.space/assets/hotel5-BPUZUmP0.jpg'],
      amenities: [
        { name: "Free Wifi", icon: `<i class="fa-solid fa-wifi"></i>` },
        { name: "Restaurant", icon: `<i class="fa-solid fa-utensils"></i>` },
        { name: "Room Service", icon: `<i class="fa-solid fa-bell-concierge"></i>` },
        { name: "Concierge", icon: `<i class="fa-solid fa-burger"></i>` },
        { name: "Gym", icon: `<i class="fa-solid fa-dumbbell"></i>` }
      ]
    },
    {
      hotel: "Mountain Lodge",
      city: "Colorado",
      price: 150,
      starRating: 4,
      description: "Escape to the mountains and enjoy fresh air, hiking trails, and cozy accommodations. Our lodge offers a perfect retreat from city life with rustic charm and modern comfort.",
      images: ['https://tuhmxvun.manus.space/assets/hotel3-NddmshxU.jpg', 'https://tuhmxvun.manus.space/assets/hotel6-CtawxXqx.jpg', 'https://tuhmxvun.manus.space/assets/hotel1-DblUoNlc.jpg'],
      amenities: [
        { name: "Free Wifi", icon: `<i class="fa-solid fa-wifi"></i>` },
        { name: "Restaurant", icon: `<i class="fa-solid fa-utensils"></i>` },
        { name: "Room Service", icon: `<i class="fa-solid fa-bell-concierge"></i>` },
        { name: "Concierge", icon: `<i class="fa-solid fa-burger"></i>` },
        { name: "Gym", icon: `<i class="fa-solid fa-dumbbell"></i>` }
      ]
    },
    {
      hotel: "City Center Hotel",
      city: "Los Angeles",
      price: 180,
      starRating: 3,
      description: "Indulge in spacious suites with panoramic city views, premium amenities, and personalized service. Perfect for extended stays and special occasions in the entertainment capital.",
      images: ['https://tuhmxvun.manus.space/assets/hotel5-BPUZUmP0.jpg', 'https://tuhmxvun.manus.space/assets/hotel1-DblUoNlc.jpg', 'https://tuhmxvun.manus.space/assets/hotel3-NddmshxU.jpg'],
      amenities: [
        { name: "Free Wifi", icon: `<i class="fa-solid fa-wifi"></i>` },
        { name: "Restaurant", icon: `<i class="fa-solid fa-utensils"></i>` },
        { name: "Room Service", icon: `<i class="fa-solid fa-bell-concierge"></i>` },
        { name: "Concierge", icon: `<i class="fa-solid fa-burger"></i>` },
        { name: "Gym", icon: `<i class="fa-solid fa-dumbbell"></i>` }
      ]
    },
    {
      hotel: "Luxury Suites",
      city: "Chicago",
      price: 400,
      starRating: 3,
      description: "Located in the bustling heart of Chicago, our hotel provides easy access to shopping, dining, and entertainment. Modern rooms with all the amenities you need for business or leisure.",
      images: ['https://tuhmxvun.manus.space/assets/hotel4-BM2_Ks_P.jpg', 'https://tuhmxvun.manus.space/assets/hotel2-DOKstNFX.jpg', 'https://tuhmxvun.manus.space/assets/hotel5-BPUZUmP0.jpg'],
      amenities: [
        { name: "Free Wifi", icon: `<i class="fa-solid fa-wifi"></i>` },
        { name: "Restaurant", icon: `<i class="fa-solid fa-utensils"></i>` },
        { name: "Room Service", icon: `<i class="fa-solid fa-bell-concierge"></i>` },
        { name: "Concierge", icon: `<i class="fa-solid fa-burger"></i>` },
        { name: "Gym", icon: `<i class="fa-solid fa-dumbbell"></i>` }
      ]
    },
    {
      hotel: "Budget Inn",
      city: "Phoenix",
      price: 80,
      starRating: 2,
      description: "Clean, comfortable, and affordable accommodations for budget-conscious travelers. While simple, our inn provides all the essentials for a pleasant stay without breaking the bank.",
      images: ['https://tuhmxvun.manus.space/assets/hotel6-CtawxXqx.jpg', 'https://tuhmxvun.manus.space/assets/hotel4-BM2_Ks_P.jpg', 'https://tuhmxvun.manus.space/assets/hotel2-DOKstNFX.jpg'],
      amenities: [
        { name: "Free Wifi", icon: `<i class="fa-solid fa-wifi"></i>` },
        { name: "Restaurant", icon: `<i class="fa-solid fa-utensils"></i>` },
        { name: "Room Service", icon: `<i class="fa-solid fa-bell-concierge"></i>` },
        { name: "Concierge", icon: `<i class="fa-solid fa-burger"></i>` },
        { name: "Gym", icon: `<i class="fa-solid fa-dumbbell"></i>` }
      ]
    }
  ];

  getHotels(): any[] {
    return this.allProducts;
  }

  setSelectedHotel(hotel: any): void {
    this.selectedHotel = hotel;
  }

  getSelectedHotel(): any {
    return this.selectedHotel;
  }

  getHotelByName(hotelName: string): any {
    return this.allProducts.find(hotel => hotel.hotel === hotelName) || null;
  }
}