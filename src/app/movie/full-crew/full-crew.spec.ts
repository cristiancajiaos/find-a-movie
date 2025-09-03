import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCrew } from './full-crew';

describe('FullCrew', () => {
  let component: FullCrew;
  let fixture: ComponentFixture<FullCrew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullCrew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCrew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
