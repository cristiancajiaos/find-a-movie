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

  public defaultOrderCriteria: OrderCriteria;

  @Input() orderCriterias: OrderCriteria[] = [];
  @Input() placeholderText: string = 'Select an order criteria';

  @Output() onOrderCriteriaChange: EventEmitter<OrderCriteria> = new EventEmitter<OrderCriteria>();

  @ViewChild("orderSelect") orderSelect: NgSelectComponent;

  constructor(
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.defaultOrderCriteria = this.orderCriterias[0];
    this.orderForm = this.fb.group({
      order: new FormControl(this.defaultOrderCriteria.id)
    });
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria): void {
    this.onOrderCriteriaChange.emit(orderCriteria);
  }

  public focusSelect(): void {
    this.orderSelect.focus();
  }

  public setDefaultOrderCriteria(): void {
    this.orderForm.controls['order'].setValue(this.defaultOrderCriteria.id);
    this.orderCriteriaChange(this.defaultOrderCriteria);
  }
}
