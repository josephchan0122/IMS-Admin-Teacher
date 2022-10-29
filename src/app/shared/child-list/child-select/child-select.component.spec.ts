import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildSelectComponent } from './child-select.component';

describe('ChildSelectComponent', () => {
  let component: ChildSelectComponent;
  let fixture: ComponentFixture<ChildSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
