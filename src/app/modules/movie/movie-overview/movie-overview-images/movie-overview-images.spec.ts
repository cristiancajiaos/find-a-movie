import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewImages } from './movie-overview-images';

describe('MovieOverviewImages', () => {
  let component: MovieOverviewImages;
  let fixture: ComponentFixture<MovieOverviewImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
