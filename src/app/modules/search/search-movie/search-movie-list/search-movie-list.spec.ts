import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieList } from './search-movie-list';

describe('SearchMovieList', () => {
  let component: SearchMovieList;
  let fixture: ComponentFixture<SearchMovieList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMovieList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMovieList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
