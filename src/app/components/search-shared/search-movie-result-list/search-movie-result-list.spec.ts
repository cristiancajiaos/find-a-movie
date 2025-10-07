import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieResultList } from './search-movie-result-list';

describe('SearchMovieResultList', () => {
  let component: SearchMovieResultList;
  let fixture: ComponentFixture<SearchMovieResultList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMovieResultList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMovieResultList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
