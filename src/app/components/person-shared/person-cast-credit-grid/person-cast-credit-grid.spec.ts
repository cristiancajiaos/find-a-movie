import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCastCreditGrid } from './person-cast-credit-grid';

describe('PersonCastCreditGrid', () => {
  let component: PersonCastCreditGrid;
  let fixture: ComponentFixture<PersonCastCreditGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCastCreditGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCastCreditGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
