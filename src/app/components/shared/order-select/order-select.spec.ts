import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSelect } from './order-select';

describe('OrderSelect', () => {
  let component: OrderSelect;
  let fixture: ComponentFixture<OrderSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
