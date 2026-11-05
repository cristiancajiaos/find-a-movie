import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewRecommendations } from './movie-overview-recommendations';

describe('MovieOverviewRecommendations', () => {
  let component: MovieOverviewRecommendations;
  let fixture: ComponentFixture<MovieOverviewRecommendations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewRecommendations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewRecommendations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
