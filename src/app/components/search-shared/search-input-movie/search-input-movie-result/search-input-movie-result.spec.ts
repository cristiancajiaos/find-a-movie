import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputMovieResult } from './search-input-movie-result';

describe('SearchInputMovieResult', () => {
  let component: SearchInputMovieResult;
  let fixture: ComponentFixture<SearchInputMovieResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputMovieResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputMovieResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
