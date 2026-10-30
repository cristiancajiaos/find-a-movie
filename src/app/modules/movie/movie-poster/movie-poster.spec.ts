import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePoster } from './movie-poster';

describe('MoviePoster', () => {
  let component: MoviePoster;
  let fixture: ComponentFixture<MoviePoster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviePoster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePoster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
