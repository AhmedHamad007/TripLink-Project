import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristProfileSettingComponent } from './tourist-profile-setting.component';

describe('TouristProfileSettingComponent', () => {
  let component: TouristProfileSettingComponent;
  let fixture: ComponentFixture<TouristProfileSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristProfileSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristProfileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
