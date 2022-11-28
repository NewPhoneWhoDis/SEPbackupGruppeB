import { TestBed } from '@angular/core/testing';

import { SystemdateService } from './systemdate.service';

describe('SystemdateService', () => {
  let service: SystemdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
