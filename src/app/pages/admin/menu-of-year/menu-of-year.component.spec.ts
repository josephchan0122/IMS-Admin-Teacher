import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOfYearComponent } from './menu-of-year.component';

describe('MenuOfYearComponent', () => {
  let component: MenuOfYearComponent;
  let fixture: ComponentFixture<MenuOfYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOfYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOfYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
