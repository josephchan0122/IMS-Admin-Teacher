import { TestBed } from '@angular/core/testing';

import { ClassRoomGuard } from './class-room.guard';

describe('ClassRoomGuard', () => {
  let guard: ClassRoomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClassRoomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
