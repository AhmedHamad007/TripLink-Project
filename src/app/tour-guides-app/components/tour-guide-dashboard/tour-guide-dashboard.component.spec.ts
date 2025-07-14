import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourGuideDashboardComponent } from './tour-guide-dashboard.component';

describe('TourGuideDashboardComponent', () => {
  let component: TourGuideDashboardComponent;
  let fixture: ComponentFixture<TourGuideDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourGuideDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourGuideDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
