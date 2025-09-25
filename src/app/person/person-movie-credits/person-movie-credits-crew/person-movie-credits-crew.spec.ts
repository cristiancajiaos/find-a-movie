import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMovieCreditsCrew } from './person-movie-credits-crew';

describe('PersonMovieCreditsCrew', () => {
  let component: PersonMovieCreditsCrew;
  let fixture: ComponentFixture<PersonMovieCreditsCrew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonMovieCreditsCrew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonMovieCreditsCrew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
