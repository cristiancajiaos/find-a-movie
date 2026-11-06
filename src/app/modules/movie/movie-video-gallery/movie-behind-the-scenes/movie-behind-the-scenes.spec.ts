import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBehindTheScenes } from './movie-behind-the-scenes';

describe('MovieBehindTheScenes', () => {
  let component: MovieBehindTheScenes;
  let fixture: ComponentFixture<MovieBehindTheScenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieBehindTheScenes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieBehindTheScenes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
