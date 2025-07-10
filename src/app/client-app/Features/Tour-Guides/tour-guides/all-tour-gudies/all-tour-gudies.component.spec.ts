import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTourGudiesComponent } from './all-tour-gudies.component';

describe('AllTourGudiesComponent', () => {
  let component: AllTourGudiesComponent;
  let fixture: ComponentFixture<AllTourGudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTourGudiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTourGudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
