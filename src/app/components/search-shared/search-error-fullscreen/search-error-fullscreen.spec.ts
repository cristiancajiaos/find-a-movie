import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchErrorFullscreen } from './search-error-fullscreen';

describe('SearchErrorFullscreen', () => {
  let component: SearchErrorFullscreen;
  let fixture: ComponentFixture<SearchErrorFullscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchErrorFullscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchErrorFullscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
