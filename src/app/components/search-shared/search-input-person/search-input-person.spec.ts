import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputPerson } from './search-input-person';

describe('SearchInputPerson', () => {
  let component: SearchInputPerson;
  let fixture: ComponentFixture<SearchInputPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputPerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputPerson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
