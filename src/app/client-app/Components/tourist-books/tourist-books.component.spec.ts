import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristBooksComponent } from './tourist-books.component';

describe('TouristBooksComponent', () => {
  let component: TouristBooksComponent;
  let fixture: ComponentFixture<TouristBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
