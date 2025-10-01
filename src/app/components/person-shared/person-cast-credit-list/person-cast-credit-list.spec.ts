import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCastCreditList } from './person-cast-credit-list';

describe('PersonCastCreditList', () => {
  let component: PersonCastCreditList;
  let fixture: ComponentFixture<PersonCastCreditList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCastCreditList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCastCreditList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
