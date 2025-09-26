import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewTrailer } from './movie-overview-trailer';

describe('MovieOverviewTrailer', () => {
  let component: MovieOverviewTrailer;
  let fixture: ComponentFixture<MovieOverviewTrailer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewTrailer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewTrailer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
