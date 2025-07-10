import { Component, Input, Output, EventEmitter } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TourGuidesComponent } from '../tour-guides.component';

@Component({
  selector: 'app-all-tour-gudies',
  imports: [RouterModule, CommonModule],
  templateUrl: './all-tour-gudies.component.html',
  styleUrl: './all-tour-gudies.component.scss'
})
export class AllTourGudiesComponent {
tourGuides = [
    {
      id: 'guide1',
      name: 'Ahmed Mohamed Ali',
      specialty: 'Egyptology',
      image: 'images/Client-TourGuides/AllGuides/michael-dam-mEZ3PoFGs_k-unsplash.jpg',
      skills: ['Ancient Egyptian History', 'Multilingual: Arabic & English', 'Certified National Guide'],
      fixedTrips: ['Pyramids of Giza + Sphinx', 'Egyptian Museum', 'Khan El Khalili Market']
    },
    {
      id: 'guide2',
      name: 'Fatma ramy Hassan',
      specialty: 'Nile Cruises',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Nile Cruise Management', 'Multilingual: Arabic & French', 'Expert in Egyptian Culture'],
      fixedTrips: ['Luxor & Aswan Nile Cruise', 'Karnak Temple', 'Valley of the Kings']
    },
    {
      id: 'guide3',
      name: 'laila Gamal Monir',
      specialty: 'Desert Safaris',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Desert Safari Leadership', 'Multilingual: Arabic & English', 'Camping Expertise'],
      fixedTrips: ['Bahariya Oasis Safari', 'White Desert', 'Bedouin Experience']
    },
    {
      id: 'guide4',
      name: 'Marwa Saad Nagy',
      specialty: 'Desert Safaris',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Desert Trip Organization', 'Multilingual: Arabic & Spanish', 'Photography Expertise'],
      fixedTrips: ['Sinai Safari', 'Wadi Rumla', 'Black Desert Experience']
    },
    {
      id: 'guide5',
      name: 'Fady Gozef Nashat',
      specialty: 'Desert Safaris',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Desert Jeep Driving', 'Multilingual: Arabic & English', 'Astronomy Expertise'],
      fixedTrips: ['Farafra Safari', 'Black Desert', 'Adventure Experience']
    },
    {
      id: 'guide6',
      name: 'Karim Yasser',
      specialty: 'Desert Safaris',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Adventure Planning', 'Multilingual: Arabic & German', 'Bedouin History Expertise'],
      fixedTrips: ['Hurghada Safari', 'Wadi El-Hitan', 'Red Desert Experience']
    },
    {
      id: 'guide7',
      name: 'Karim Yasser',
      specialty: 'Desert Safaris',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Adventure Planning', 'Multilingual: Arabic & German', 'Bedouin History Expertise'],
      fixedTrips: ['Hurghada Safari', 'Wadi El-Hitan', 'Red Desert Experience']
    },
    {
      id: 'guide8',
      name: 'Karim Yasser',
      specialty: 'Desert Safaris',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Adventure Planning', 'Multilingual: Arabic & German', 'Bedouin History Expertise'],
      fixedTrips: ['Hurghada Safari', 'Wadi El-Hitan', 'Red Desert Experience']
    },{
      id: 'guide9',
      name: 'Karim Yasser',
      specialty: 'Desert Safaris',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Adventure Planning', 'Multilingual: Arabic & German', 'Bedouin History Expertise'],
      fixedTrips: ['Hurghada Safari', 'Wadi El-Hitan', 'Red Desert Experience']
    },{
      id: 'guide10',
      name: 'Karim Yasser',
      specialty: 'Desert Safaris',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      skills: ['Adventure Planning', 'Multilingual: Arabic & German', 'Bedouin History Expertise'],
      fixedTrips: ['Hurghada Safari', 'Wadi El-Hitan', 'Red Desert Experience']
    },
  ];

selectedGuide: any = null;

  openSlidePanel(guideId: string) {
    this.selectedGuide = this.tourGuides.find(guide => guide.id === guideId) || null;
  }

  closeSlidePanel() {
    this.selectedGuide = null;
  }
}
