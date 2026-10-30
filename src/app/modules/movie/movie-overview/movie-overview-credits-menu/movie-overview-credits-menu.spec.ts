import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewCreditsMenu } from './movie-overview-credits-menu';

describe('MovieOverviewCreditsMenu', () => {
  let component: MovieOverviewCreditsMenu;
  let fixture: ComponentFixture<MovieOverviewCreditsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewCreditsMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewCreditsMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
