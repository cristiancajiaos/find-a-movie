import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNav } from './movie-nav';

describe('MovieNav', () => {
  let component: MovieNav;
  let fixture: ComponentFixture<MovieNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
