import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderCriteria } from '../../../interfaces/order-criteria';

@Component({
  selector: 'app-order-select',
  standalone: false,
  templateUrl: './order-select.html',
  styleUrl: './order-select.scss'
})
export class OrderSelect implements OnInit {

  @Input() orderCriterias: OrderCriteria[] = [];

  public orderForm: FormGroup = new FormGroup({});

  @Output() onOrderCriteriaChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      order: new FormControl(0)
    });
  }

  public orderCriteriaChange(): void {
    const orderCriteriaValue: string = this.orderForm.controls['order'].value;
    this.onOrderCriteriaChange.emit(orderCriteriaValue);
  }



}
