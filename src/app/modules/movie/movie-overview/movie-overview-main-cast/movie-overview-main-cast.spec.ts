import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewMainCast } from './movie-overview-main-cast';

describe('MovieOverviewMainCast', () => {
  let component: MovieOverviewMainCast;
  let fixture: ComponentFixture<MovieOverviewMainCast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewMainCast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewMainCast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
