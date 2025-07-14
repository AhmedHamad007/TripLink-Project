import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTourismCompanyComponent } from './register-tourism-company.component';

describe('RegisterTourismCompanyComponent', () => {
  let component: RegisterTourismCompanyComponent;
  let fixture: ComponentFixture<RegisterTourismCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTourismCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTourismCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
