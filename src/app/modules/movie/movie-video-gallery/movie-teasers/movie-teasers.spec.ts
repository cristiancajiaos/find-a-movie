import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTeasers } from './movie-teasers';

describe('MovieTeasers', () => {
  let component: MovieTeasers;
  let fixture: ComponentFixture<MovieTeasers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieTeasers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTeasers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
