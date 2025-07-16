import { TestBed } from '@angular/core/testing';

import { HotelRegisterationService } from './hotel-registeration.service';

describe('HotelRegisterationService', () => {
  let service: HotelRegisterationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelRegisterationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
