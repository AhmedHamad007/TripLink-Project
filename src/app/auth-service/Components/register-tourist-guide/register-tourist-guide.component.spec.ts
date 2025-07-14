import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTouristGuideComponent } from './register-tourist-guide.component';

describe('RegisterTouristGuideComponent', () => {
  let component: RegisterTouristGuideComponent;
  let fixture: ComponentFixture<RegisterTouristGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTouristGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTouristGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
