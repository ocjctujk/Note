import { TestBed } from '@angular/core/testing';

import { SrorageService } from './srorage.service';

describe('SrorageService', () => {
  let service: SrorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
