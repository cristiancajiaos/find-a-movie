import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewSimilar } from './movie-overview-similar';

describe('MovieOverviewSimilar', () => {
  let component: MovieOverviewSimilar;
  let fixture: ComponentFixture<MovieOverviewSimilar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewSimilar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewSimilar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
