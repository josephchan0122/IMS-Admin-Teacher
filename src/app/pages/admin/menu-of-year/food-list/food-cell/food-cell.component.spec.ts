import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCellComponent } from './food-cell.component';

describe('FoodCellComponent', () => {
  let component: FoodCellComponent;
  let fixture: ComponentFixture<FoodCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
