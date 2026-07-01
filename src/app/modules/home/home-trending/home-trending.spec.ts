import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrending } from './home-trending';

describe('HomeTrending', () => {
  let component: HomeTrending;
  let fixture: ComponentFixture<HomeTrending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTrending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTrending);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
