import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieClips } from './movie-clips';

describe('MovieClips', () => {
  let component: MovieClips;
  let fixture: ComponentFixture<MovieClips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieClips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieClips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
