import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieErrorFullscreen } from './movie-error-fullscreen';

describe('MovieErrorFullscreen', () => {
  let component: MovieErrorFullscreen;
  let fixture: ComponentFixture<MovieErrorFullscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieErrorFullscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieErrorFullscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
