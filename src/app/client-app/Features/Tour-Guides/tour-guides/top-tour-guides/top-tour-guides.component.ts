import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-tour-guides',
  imports: [CommonModule  ],
  templateUrl: './top-tour-guides.component.html',
  styleUrl: './top-tour-guides.component.scss'
})
export class TopTourGuidesComponent {
  topGuides = [
    {
      name: 'Mohamed Bahazig',
      specialty: 'History expert, speaks English and Arabic',
      image: 'images/Client-TourGuides/TopGuides/craig-mckay-jmURdhtm7Ng-unsplash.jpg',
      rating: '⭐️⭐️⭐️⭐️⭐️ (5.0)'
    },
    {
      name: 'Sarah Ibrahim',
      specialty: 'Specializing in exploring Cairo.s neighborhoods,speaks Spanish and Portuguese.',
      image: 'images/Client-TourGuides/TopGuides/logan-weaver-lgnwvr-QoZRUI6LdKw-unsplash.jpg',
      rating: '⭐️⭐️⭐️⭐️☆ (4.7)'
    },
    {
      name: 'Yousef Nabil',
      specialty: 'For Luxor/Aswan, speaks French and English',
      image: 'images/Client-TourGuides/TopGuides/ian-dooley-d1UPkiFd04A-unsplash.jpg',
      rating: '⭐️⭐️⭐️⭐️⭐️ (4.9)'
    }
  ];
}
