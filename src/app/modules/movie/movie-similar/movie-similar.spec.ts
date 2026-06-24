import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSimilar } from './movie-similar';

describe('MovieSimilar', () => {
  let component: MovieSimilar;
  let fixture: ComponentFixture<MovieSimilar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieSimilar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSimilar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
