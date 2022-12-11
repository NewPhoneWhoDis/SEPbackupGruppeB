import { TestBed } from '@angular/core/testing';

import { BetroundService } from './betround.service';

describe('BetroundService', () => {
  let service: BetroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
