import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMovie } from './home-movie';

describe('HomeMovie', () => {
  let component: HomeMovie;
  let fixture: ComponentFixture<HomeMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
