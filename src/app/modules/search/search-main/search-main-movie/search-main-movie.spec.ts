import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainMovie } from './search-main-movie';

describe('SearchMainMovie', () => {
  let component: SearchMainMovie;
  let fixture: ComponentFixture<SearchMainMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMainMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMainMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
