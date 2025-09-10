import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieError } from './movie-error';

describe('MovieError', () => {
  let component: MovieError;
  let fixture: ComponentFixture<MovieError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
