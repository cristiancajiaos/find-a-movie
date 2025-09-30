import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewInfotable } from './movie-overview-infotable';

describe('MovieOverviewInfotable', () => {
  let component: MovieOverviewInfotable;
  let fixture: ComponentFixture<MovieOverviewInfotable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieOverviewInfotable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOverviewInfotable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
