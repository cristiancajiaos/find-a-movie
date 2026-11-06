import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFeaturettes } from './movie-featurettes';

describe('MovieFeaturettes', () => {
  let component: MovieFeaturettes;
  let fixture: ComponentFixture<MovieFeaturettes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieFeaturettes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieFeaturettes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
