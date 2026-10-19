import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFilters } from './reset-filters';

describe('ResetFilters', () => {
  let component: ResetFilters;
  let fixture: ComponentFixture<ResetFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
