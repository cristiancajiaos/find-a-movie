import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieVideoGallery } from './movie-video-gallery';

describe('MovieVideoGallery', () => {
  let component: MovieVideoGallery;
  let fixture: ComponentFixture<MovieVideoGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieVideoGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieVideoGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
