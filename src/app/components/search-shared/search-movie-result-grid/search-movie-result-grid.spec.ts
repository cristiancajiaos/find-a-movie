import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieResultGrid } from './search-movie-result-grid';

describe('SearchMovieResultGrid', () => {
  let component: SearchMovieResultGrid;
  let fixture: ComponentFixture<SearchMovieResultGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMovieResultGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMovieResultGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
