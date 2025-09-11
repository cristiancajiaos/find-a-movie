import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonNotFound } from './person-not-found';

describe('PersonNotFound', () => {
  let component: PersonNotFound;
  let fixture: ComponentFixture<PersonNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonNotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
