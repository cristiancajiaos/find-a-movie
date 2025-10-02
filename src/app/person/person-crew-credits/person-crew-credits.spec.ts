import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCrewCredits } from './person-crew-credits';

describe('PersonCrewCredits', () => {
  let component: PersonCrewCredits;
  let fixture: ComponentFixture<PersonCrewCredits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCrewCredits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCrewCredits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
