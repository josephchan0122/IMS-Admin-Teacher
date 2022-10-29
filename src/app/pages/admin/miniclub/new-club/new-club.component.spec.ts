import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClubComponent } from './new-club.component';

describe('NewClubComponent', () => {
  let component: NewClubComponent;
  let fixture: ComponentFixture<NewClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
