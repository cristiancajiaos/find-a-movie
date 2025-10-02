import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySelector } from './display-selector';

describe('DisplaySelector', () => {
  let component: DisplaySelector;
  let fixture: ComponentFixture<DisplaySelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplaySelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
