import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCredits } from './person-credits';

describe('PersonCredits', () => {
  let component: PersonCredits;
  let fixture: ComponentFixture<PersonCredits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCredits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCredits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
