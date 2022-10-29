import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotificationComponent } from './send-notification.component';

describe('SendNotificationComponent', () => {
  let component: SendNotificationComponent;
  let fixture: ComponentFixture<SendNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
