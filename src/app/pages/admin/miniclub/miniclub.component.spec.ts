import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniclubComponent } from './miniclub.component';

describe('MiniclubComponent', () => {
  let component: MiniclubComponent;
  let fixture: ComponentFixture<MiniclubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniclubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
