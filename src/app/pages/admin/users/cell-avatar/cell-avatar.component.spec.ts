import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellAvatarComponent } from './cell-avatar.component';

describe('CellAvatarComponent', () => {
  let component: CellAvatarComponent;
  let fixture: ComponentFixture<CellAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
