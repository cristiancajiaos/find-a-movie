import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMovieCredits } from './person-movie-credits';

describe('PersonMovieCredits', () => {
  let component: PersonMovieCredits;
  let fixture: ComponentFixture<PersonMovieCredits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonMovieCredits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonMovieCredits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
