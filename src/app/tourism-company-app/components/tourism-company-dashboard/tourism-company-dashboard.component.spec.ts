import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourismCompanyDashboardComponent } from './tourism-company-dashboard.component';

describe('TourismCompanyDashboardComponent', () => {
  let component: TourismCompanyDashboardComponent;
  let fixture: ComponentFixture<TourismCompanyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourismCompanyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourismCompanyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
