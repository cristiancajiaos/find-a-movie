import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrendingError } from './home-trending-error';

describe('HomeTrendingError', () => {
  let component: HomeTrendingError;
  let fixture: ComponentFixture<HomeTrendingError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTrendingError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTrendingError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
