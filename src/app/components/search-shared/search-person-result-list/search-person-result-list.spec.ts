import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonResultList } from './search-person-result-list';

describe('SearchPersonResultList', () => {
  let component: SearchPersonResultList;
  let fixture: ComponentFixture<SearchPersonResultList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPersonResultList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPersonResultList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
