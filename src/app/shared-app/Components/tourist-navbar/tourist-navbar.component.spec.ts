import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristNavbarComponent } from './tourist-navbar.component';

describe('TouristNavbarComponent', () => {
  let component: TouristNavbarComponent;
  let fixture: ComponentFixture<TouristNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
