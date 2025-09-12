import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCrewCredit } from './person-crew-credit';

describe('PersonCrewCredit', () => {
  let component: PersonCrewCredit;
  let fixture: ComponentFixture<PersonCrewCredit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCrewCredit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCrewCredit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
