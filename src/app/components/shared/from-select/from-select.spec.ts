import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromSelect } from './from-select';

describe('FromSelect', () => {
  let component: FromSelect;
  let fixture: ComponentFixture<FromSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FromSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
