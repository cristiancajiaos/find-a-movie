import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNotFound } from './movie-not-found';

describe('MovieNotFound', () => {
  let component: MovieNotFound;
  let fixture: ComponentFixture<MovieNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieNotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
