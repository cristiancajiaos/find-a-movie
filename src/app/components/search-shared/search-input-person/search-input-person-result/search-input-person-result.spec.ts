import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputPersonResult } from './search-input-person-result';

describe('SearchInputPersonResult', () => {
  let component: SearchInputPersonResult;
  let fixture: ComponentFixture<SearchInputPersonResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputPersonResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputPersonResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
