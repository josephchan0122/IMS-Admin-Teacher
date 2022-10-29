import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPresetCreateComponent } from './appointment-preset-create.component';

describe('AppointmentPresetCreateComponent', () => {
  let component: AppointmentPresetCreateComponent;
  let fixture: ComponentFixture<AppointmentPresetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPresetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPresetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
