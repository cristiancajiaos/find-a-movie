import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonError } from './person-error';

describe('PersonError', () => {
  let component: PersonError;
  let fixture: ComponentFixture<PersonError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
