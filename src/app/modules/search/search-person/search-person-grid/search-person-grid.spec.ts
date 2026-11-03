import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonGrid } from './search-person-grid';

describe('SearchPersonGrid', () => {
  let component: SearchPersonGrid;
  let fixture: ComponentFixture<SearchPersonGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPersonGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPersonGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
