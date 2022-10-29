import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMeetingComponent } from './request-meeting.component';

describe('RequestMeetingComponent', () => {
  let component: RequestMeetingComponent;
  let fixture: ComponentFixture<RequestMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
