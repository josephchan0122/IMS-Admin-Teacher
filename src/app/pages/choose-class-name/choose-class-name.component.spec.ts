import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseClassNameComponent } from './choose-class-name.component';

describe('ChooseClassNameComponent', () => {
  let component: ChooseClassNameComponent;
  let fixture: ComponentFixture<ChooseClassNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseClassNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseClassNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
