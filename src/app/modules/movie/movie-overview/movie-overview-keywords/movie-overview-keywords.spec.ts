import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewKeywords } from './movie-overview-keywords';

describe('MovieOverviewKeywords', () => {
  let component: MovieOverviewKeywords;
  let fixture: ComponentFixture<MovieOverviewKeywords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewKeywords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewKeywords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
