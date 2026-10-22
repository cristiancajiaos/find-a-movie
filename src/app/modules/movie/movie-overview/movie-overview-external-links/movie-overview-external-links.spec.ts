import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewExternalLinks } from './movie-overview-external-links';

describe('MovieOverviewExternalLinks', () => {
  let component: MovieOverviewExternalLinks;
  let fixture: ComponentFixture<MovieOverviewExternalLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewExternalLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewExternalLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
