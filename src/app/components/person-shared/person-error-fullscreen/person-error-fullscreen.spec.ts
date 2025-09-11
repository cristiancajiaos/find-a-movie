import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonErrorFullscreen } from './person-error-fullscreen';

describe('PersonErrorFullscreen', () => {
  let component: PersonErrorFullscreen;
  let fixture: ComponentFixture<PersonErrorFullscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonErrorFullscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonErrorFullscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
