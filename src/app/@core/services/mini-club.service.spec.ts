import { TestBed } from '@angular/core/testing';

import { MiniClubService } from './mini-club.service';

describe('MiniClubService', () => {
  let service: MiniClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniClubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
