import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonExternalLinks } from './person-external-links';

describe('PersonExternalLinks', () => {
  let component: PersonExternalLinks;
  let fixture: ComponentFixture<PersonExternalLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonExternalLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonExternalLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
