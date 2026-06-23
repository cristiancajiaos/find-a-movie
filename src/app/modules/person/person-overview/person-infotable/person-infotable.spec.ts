import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInfotable } from './person-infotable';

describe('PersonInfotable', () => {
  let component: PersonInfotable;
  let fixture: ComponentFixture<PersonInfotable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonInfotable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonInfotable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
