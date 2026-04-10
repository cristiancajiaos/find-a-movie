import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSelect } from './to-select';

describe('ToSelect', () => {
  let component: ToSelect;
  let fixture: ComponentFixture<ToSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
