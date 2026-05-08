import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainPerson } from './search-main-person';

describe('SearchMainPerson', () => {
  let component: SearchMainPerson;
  let fixture: ComponentFixture<SearchMainPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMainPerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMainPerson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
