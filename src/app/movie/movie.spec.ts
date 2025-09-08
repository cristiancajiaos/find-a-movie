import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Movie } from './movie';

describe('Movie', () => {
  let component: Movie;
  let fixture: ComponentFixture<Movie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Movie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Movie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
