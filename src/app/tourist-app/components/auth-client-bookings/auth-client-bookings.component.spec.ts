import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClientBookingsComponent } from './auth-client-bookings.component';

describe('AuthClientBookingsComponent', () => {
  let component: AuthClientBookingsComponent;
  let fixture: ComponentFixture<AuthClientBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthClientBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthClientBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
