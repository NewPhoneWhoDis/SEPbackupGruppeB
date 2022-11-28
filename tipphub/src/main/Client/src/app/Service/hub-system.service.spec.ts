import { TestBed } from '@angular/core/testing';

import { HubSystemService } from './hub-system.service';

describe('HubSystemService', () => {
  let service: HubSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
