import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPresetEditComponent } from './appointment-preset-edit.component';

describe('AppointmentPresetEditComponent', () => {
  let component: AppointmentPresetEditComponent;
  let fixture: ComponentFixture<AppointmentPresetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPresetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPresetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
