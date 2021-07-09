import { TestBed } from '@angular/core/testing';

import { UrgenciesApiService } from './urgencies-api.service';

describe('UrgenciesApiService', () => {
  let service: UrgenciesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrgenciesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
