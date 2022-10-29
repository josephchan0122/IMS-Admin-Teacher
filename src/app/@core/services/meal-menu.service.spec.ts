import { TestBed } from '@angular/core/testing';

import { MealMenuService } from './meal-menu.service';

describe('MealMenuService', () => {
  let service: MealMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
