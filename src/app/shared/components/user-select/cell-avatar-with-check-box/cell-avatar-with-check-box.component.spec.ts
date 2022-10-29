import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellAvatarWithCheckBoxComponent } from './cell-avatar-with-check-box.component';

describe('CellAvatarWithCheckBoxComponent', () => {
  let component: CellAvatarWithCheckBoxComponent;
  let fixture: ComponentFixture<CellAvatarWithCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellAvatarWithCheckBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellAvatarWithCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
