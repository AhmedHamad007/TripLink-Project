import { TestBed } from '@angular/core/testing';

import { TouristRegisterationService } from './tourist-registeration.service';

describe('TouristRegisterationService', () => {
  let service: TouristRegisterationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristRegisterationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
