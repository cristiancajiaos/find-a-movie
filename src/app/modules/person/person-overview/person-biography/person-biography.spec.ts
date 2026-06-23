import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBiography } from './person-biography';

describe('PersonBiography', () => {
  let component: PersonBiography;
  let fixture: ComponentFixture<PersonBiography>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonBiography]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonBiography);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
