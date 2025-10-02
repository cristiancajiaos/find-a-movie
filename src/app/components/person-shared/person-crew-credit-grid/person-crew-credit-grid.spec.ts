import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCrewCreditGrid } from './person-crew-credit-grid';

describe('PersonCrewCreditGrid', () => {
  let component: PersonCrewCreditGrid;
  let fixture: ComponentFixture<PersonCrewCreditGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCrewCreditGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCrewCreditGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
