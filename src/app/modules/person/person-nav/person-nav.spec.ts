import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonNav } from './person-nav';

describe('PersonNav', () => {
  let component: PersonNav;
  let fixture: ComponentFixture<PersonNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
