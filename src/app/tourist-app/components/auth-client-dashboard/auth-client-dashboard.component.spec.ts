import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClientDashboardComponent } from './auth-client-dashboard.component';

describe('AuthClientDashboardComponent', () => {
  let component: AuthClientDashboardComponent;
  let fixture: ComponentFixture<AuthClientDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthClientDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthClientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
