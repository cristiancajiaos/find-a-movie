import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonResultGrid } from './search-person-result-grid';

describe('SearchPersonResultGrid', () => {
  let component: SearchPersonResultGrid;
  let fixture: ComponentFixture<SearchPersonResultGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPersonResultGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPersonResultGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
