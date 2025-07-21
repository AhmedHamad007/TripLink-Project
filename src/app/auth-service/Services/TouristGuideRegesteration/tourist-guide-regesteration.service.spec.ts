import { TestBed } from '@angular/core/testing';

import { TouristGuideRegesterationService } from './tourist-guide-regesteration.service';

describe('TouristGuideRegesterationService', () => {
  let service: TouristGuideRegesterationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristGuideRegesterationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
