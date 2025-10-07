import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieResult } from './search-movie-result';

describe('SearchMovieResult', () => {
  let component: SearchMovieResult;
  let fixture: ComponentFixture<SearchMovieResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMovieResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMovieResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
