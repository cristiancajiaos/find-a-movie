import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewMainCrew } from './movie-overview-main-crew';

describe('MovieOverviewMainCrew', () => {
  let component: MovieOverviewMainCrew;
  let fixture: ComponentFixture<MovieOverviewMainCrew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewMainCrew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewMainCrew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
