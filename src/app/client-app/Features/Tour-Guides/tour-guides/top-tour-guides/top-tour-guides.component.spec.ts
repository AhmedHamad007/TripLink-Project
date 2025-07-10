import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTourGuidesComponent } from './top-tour-guides.component';

describe('TopTourGuidesComponent', () => {
  let component: TopTourGuidesComponent;
  let fixture: ComponentFixture<TopTourGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTourGuidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTourGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
