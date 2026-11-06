import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieVideo } from './movie-video';

describe('MovieVideo', () => {
  let component: MovieVideo;
  let fixture: ComponentFixture<MovieVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
