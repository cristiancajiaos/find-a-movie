import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTrending } from './slide-trending';

describe('SlideTrending', () => {
  let component: SlideTrending;
  let fixture: ComponentFixture<SlideTrending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideTrending]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideTrending);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
