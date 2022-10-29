import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCenterComponent } from './appointment-center.component';

describe('AppointmentCenterComponent', () => {
  let component: AppointmentCenterComponent;
  let fixture: ComponentFixture<AppointmentCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
