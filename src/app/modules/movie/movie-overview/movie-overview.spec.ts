import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverview } from './movie-overview';

describe('MovieOverview', () => {
  let component: MovieOverview;
  let fixture: ComponentFixture<MovieOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
