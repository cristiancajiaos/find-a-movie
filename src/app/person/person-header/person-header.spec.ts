import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHeader } from './person-header';

describe('PersonHeader', () => {
  let component: PersonHeader;
  let fixture: ComponentFixture<PersonHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
