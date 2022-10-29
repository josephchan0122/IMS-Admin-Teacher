import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentPicturesComponent } from './parent-pictures.component';

describe('ParentPicturesComponent', () => {
  let component: ParentPicturesComponent;
  let fixture: ComponentFixture<ParentPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
