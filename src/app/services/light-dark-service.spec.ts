import { TestBed } from '@angular/core/testing';

import { LightDarkService } from './light-dark-service';

describe('LightDarkService', () => {
  let service: LightDarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightDarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
