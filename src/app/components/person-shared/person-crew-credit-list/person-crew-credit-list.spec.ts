import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCrewCreditList } from './person-crew-credit-list';

describe('PersonCrewCreditList', () => {
  let component: PersonCrewCreditList;
  let fixture: ComponentFixture<PersonCrewCreditList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCrewCreditList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCrewCreditList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
