import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputLoading } from './search-input-loading';

describe('SearchInputLoading', () => {
  let component: SearchInputLoading;
  let fixture: ComponentFixture<SearchInputLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
