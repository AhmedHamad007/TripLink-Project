import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristReviewComponent } from './tourist-review.component';

describe('TouristReviewComponent', () => {
  let component: TouristReviewComponent;
  let fixture: ComponentFixture<TouristReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
