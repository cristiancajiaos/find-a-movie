import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCastCredit } from './person-cast-credit';

describe('PersonCastCredit', () => {
  let component: PersonCastCredit;
  let fixture: ComponentFixture<PersonCastCredit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCastCredit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCastCredit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
