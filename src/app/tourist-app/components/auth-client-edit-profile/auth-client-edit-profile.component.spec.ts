import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClientEditProfileComponent } from './auth-client-edit-profile.component';

describe('AuthClientEditProfileComponent', () => {
  let component: AuthClientEditProfileComponent;
  let fixture: ComponentFixture<AuthClientEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthClientEditProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthClientEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
