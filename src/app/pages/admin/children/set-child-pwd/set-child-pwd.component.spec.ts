import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetChildPWDComponent } from './set-child-pwd.component';

describe('SetChildPWDComponent', () => {
  let component: SetChildPWDComponent;
  let fixture: ComponentFixture<SetChildPWDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetChildPWDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetChildPWDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
