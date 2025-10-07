import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchError } from './search-error';

describe('SearchError', () => {
  let component: SearchError;
  let fixture: ComponentFixture<SearchError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
