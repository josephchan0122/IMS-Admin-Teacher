import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetSlotItemComponent } from './preset-slot-item.component';

describe('PresetSlotItemComponent', () => {
  let component: PresetSlotItemComponent;
  let fixture: ComponentFixture<PresetSlotItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresetSlotItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetSlotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
