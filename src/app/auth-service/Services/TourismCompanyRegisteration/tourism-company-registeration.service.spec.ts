import { TestBed } from '@angular/core/testing';

import { TourismCompanyRegisterationService } from './tourism-company-registeration.service';

describe('TourismCompanyRegisterationService', () => {
  let service: TourismCompanyRegisterationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourismCompanyRegisterationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
