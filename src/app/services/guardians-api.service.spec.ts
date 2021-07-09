import { TestBed } from '@angular/core/testing';

import { GuardiansApiService } from './guardians-api.service';

describe('GuardiansApiService', () => {
  let service: GuardiansApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardiansApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
