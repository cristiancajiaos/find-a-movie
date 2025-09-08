import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFullCrew } from './movie-full-crew';

describe('MovieFullCrew', () => {
  let component: MovieFullCrew;
  let fixture: ComponentFixture<MovieFullCrew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieFullCrew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieFullCrew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
