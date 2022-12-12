import { TestBed } from '@angular/core/testing';

import { FriendslistService } from './friendslist.service';

describe('FriendslistService', () => {
  let service: FriendslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
