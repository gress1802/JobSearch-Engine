import { TestBed } from '@angular/core/testing';

import { JobMarketDataService } from './job-market-data.service';

describe('JobMarketDataService', () => {
  let service: JobMarketDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobMarketDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
