import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNowPlaying } from './home-now-playing';

describe('HomeNowPlaying', () => {
  let component: HomeNowPlaying;
  let fixture: ComponentFixture<HomeNowPlaying>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeNowPlaying]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNowPlaying);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
