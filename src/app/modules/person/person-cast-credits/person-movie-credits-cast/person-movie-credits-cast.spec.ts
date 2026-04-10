import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMovieCreditsCast } from './person-movie-credits-cast';

describe('PersonMovieCreditsCast', () => {
  let component: PersonMovieCreditsCast;
  let fixture: ComponentFixture<PersonMovieCreditsCast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonMovieCreditsCast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonMovieCreditsCast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
