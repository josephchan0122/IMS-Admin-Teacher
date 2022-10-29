import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCellComponent } from './child-cell.component';

describe('ChildCellComponent', () => {
  let component: ChildCellComponent;
  let fixture: ComponentFixture<ChildCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
