import { TestBed } from '@angular/core/testing';

import { ExchangeLibraryService } from './exchange-library.service';

describe('ExchangeLibraryService', () => {
  let service: ExchangeLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
