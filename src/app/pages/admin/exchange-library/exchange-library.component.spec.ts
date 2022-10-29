import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeLibraryComponent } from './exchange-library.component';

describe('ExchangeLibraryComponent', () => {
  let component: ExchangeLibraryComponent;
  let fixture: ComponentFixture<ExchangeLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
