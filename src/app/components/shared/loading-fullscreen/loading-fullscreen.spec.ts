import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFullscreen } from './loading-fullscreen';

describe('LoadingFullscreen', () => {
  let component: LoadingFullscreen;
  let fixture: ComponentFixture<LoadingFullscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingFullscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingFullscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
