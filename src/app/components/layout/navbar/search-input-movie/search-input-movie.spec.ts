import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputMovie } from './search-input-movie';

describe('SearchInputMovie', () => {
  let component: SearchInputMovie;
  let fixture: ComponentFixture<SearchInputMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
