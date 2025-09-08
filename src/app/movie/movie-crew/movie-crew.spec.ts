import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCrew } from './movie-crew';

describe('MovieCrew', () => {
  let component: MovieCrew;
  let fixture: ComponentFixture<MovieCrew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCrew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCrew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
