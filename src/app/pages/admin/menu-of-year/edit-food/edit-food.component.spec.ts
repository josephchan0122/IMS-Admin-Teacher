import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodComponent } from './edit-food.component';

describe('EditFoodComponent', () => {
  let component: EditFoodComponent;
  let fixture: ComponentFixture<EditFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
