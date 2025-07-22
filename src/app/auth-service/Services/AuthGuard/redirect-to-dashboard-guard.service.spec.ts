import { TestBed } from '@angular/core/testing';

import { RedirectToDashboardGuardService } from './redirect-to-dashboard-guard.service';

describe('RedirectToDashboardGuardService', () => {
  let service: RedirectToDashboardGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectToDashboardGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
