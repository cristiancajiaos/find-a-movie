import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCastCredits } from './person-cast-credits';

describe('PersonCastCredits', () => {
  let component: PersonCastCredits;
  let fixture: ComponentFixture<PersonCastCredits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCastCredits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCastCredits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
