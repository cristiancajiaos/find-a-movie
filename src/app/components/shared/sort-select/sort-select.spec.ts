import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSelect } from './sort-select';

describe('SortSelect', () => {
  let component: SortSelect;
  let fixture: ComponentFixture<SortSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
