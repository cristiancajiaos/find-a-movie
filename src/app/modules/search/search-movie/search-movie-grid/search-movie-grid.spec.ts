import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieGrid } from './search-movie-grid';

describe('SearchMovieGrid', () => {
  let component: SearchMovieGrid;
  let fixture: ComponentFixture<SearchMovieGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMovieGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMovieGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
