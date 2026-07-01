import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUpcoming } from './home-upcoming';

describe('HomeUpcoming', () => {
  let component: HomeUpcoming;
  let fixture: ComponentFixture<HomeUpcoming>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUpcoming]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUpcoming);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
