import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDailyInformationComponent } from './child-daily-information.component';

describe('ChildDailyInformationComponent', () => {
  let component: ChildDailyInformationComponent;
  let fixture: ComponentFixture<ChildDailyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildDailyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDailyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
