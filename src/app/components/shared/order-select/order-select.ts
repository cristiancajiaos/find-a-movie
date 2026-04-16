import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderCriteria } from '../../../interfaces/order-criteria';
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
  @Input() defaultOrderCriteria: OrderCriteria;

  public orderSelectLabel: string = 'Order by:'
  public orderSelectPlaceholder: string = 'Select an order criteria';

  @Output() onOrderCriteriaChange: EventEmitter<OrderCriteria> = new EventEmitter<OrderCriteria>();
  @Output() onClearOrderCriteria: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("orderSelect") orderSelect: NgSelectComponent;

  constructor(
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      order: new FormControl()
    });
  }

  public orderCriteriaChange(orderCriteria: OrderCriteria): void {
    this.onOrderCriteriaChange.emit(orderCriteria);
  }

  public clearOrderCriteria(): void {
    this.orderSelect.clearModel();
    this.onClearOrderCriteria.emit(true);
  }

  public focusSelect(): void {
    this.orderSelect.focus();
  }
}
