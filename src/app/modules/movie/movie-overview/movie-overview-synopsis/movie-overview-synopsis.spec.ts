import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewSynopsis } from './movie-overview-synopsis';

describe('MovieOverviewSynopsis', () => {
  let component: MovieOverviewSynopsis;
  let fixture: ComponentFixture<MovieOverviewSynopsis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewSynopsis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewSynopsis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
