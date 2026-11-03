import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonList } from './search-person-list';

describe('SearchPersonList', () => {
  let component: SearchPersonList;
  let fixture: ComponentFixture<SearchPersonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPersonList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPersonList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
