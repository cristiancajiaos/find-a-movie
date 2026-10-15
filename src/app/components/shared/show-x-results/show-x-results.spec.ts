import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowXResults } from './show-x-results';

describe('ShowXResults', () => {
  let component: ShowXResults;
  let fixture: ComponentFixture<ShowXResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowXResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowXResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
