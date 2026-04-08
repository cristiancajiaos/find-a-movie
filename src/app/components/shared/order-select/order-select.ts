import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderCriteria } from '../../../interfaces/order-criteria';
import { Order } from '../../../enums/order';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-order-select',
  standalone: false,
  templateUrl: './order-select.html',
  styleUrl: './order-select.scss'
})
export class OrderSelect implements OnInit {

  public orderForm: FormGroup = new FormGroup({});

  @Input() orderCriterias: OrderCriteria[] = [];

  @Output() onOrderCriteriaChange: EventEmitter<Order> = new EventEmitter<Order>();

  @ViewChild("orderSelect") orderSelect: NgSelectComponent;

  constructor(
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      order: new FormControl(Order.DefaultOrder)
    });
  }

  public orderCriteriaChange(event: Order): void {
    this.orderForm.controls['order'].setValue(event);
    const orderCriteriaValue: Order = this.orderForm.controls['order'].value;
    this.onOrderCriteriaChange.emit(orderCriteriaValue);
  }

  public focusSelect(): void {
    this.orderSelect.focus();
  }
}
