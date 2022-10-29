import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFormComponent } from './food-form.component';

describe('FoodFormComponent', () => {
  let component: FoodFormComponent;
  let fixture: ComponentFixture<FoodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
