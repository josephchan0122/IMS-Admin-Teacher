import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCellWithCheckboxComponent } from './child-cell-with-checkbox.component';

describe('ChildCellWithCheckboxComponent', () => {
  let component: ChildCellWithCheckboxComponent;
  let fixture: ComponentFixture<ChildCellWithCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildCellWithCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCellWithCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
