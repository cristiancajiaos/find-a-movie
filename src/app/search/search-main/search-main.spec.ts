import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMain } from './search-main';

describe('SearchMain', () => {
  let component: SearchMain;
  let fixture: ComponentFixture<SearchMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
