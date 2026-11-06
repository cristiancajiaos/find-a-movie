import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputSearch } from './select-input-search';

describe('SelectInputSearch', () => {
  let component: SelectInputSearch;
  let fixture: ComponentFixture<SelectInputSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectInputSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectInputSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
