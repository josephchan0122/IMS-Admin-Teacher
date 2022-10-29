import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDocumentsComponent } from './school-documents.component';

describe('SchoolDocumentsComponent', () => {
  let component: SchoolDocumentsComponent;
  let fixture: ComponentFixture<SchoolDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
