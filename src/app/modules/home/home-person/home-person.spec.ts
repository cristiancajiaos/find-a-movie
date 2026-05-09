import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePerson } from './home-person';

describe('HomePerson', () => {
  let component: HomePerson;
  let fixture: ComponentFixture<HomePerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePerson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
