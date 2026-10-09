import { Component, OnInit, ViewChild, ChangeDetectionStrategy, input, InputSignal, output, OutputEmitterRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderCriteria } from '../../../interfaces/order-criteria';
import { NgSelectComponent } from '@ng-select/ng-select';
import { faCircleInfo, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-select',
  standalone: false,
  templateUrl: './order-select.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './order-select.scss'
})
export class OrderSelect implements OnInit {

  private fb = inject(FormBuilder);

  public circleInfo: IconDefinition = faCircleInfo;

  public orderForm: FormGroup = new FormGroup({});

  public orderSelectLabel: string = 'Order by:';
  public orderSelectPlaceholder: string = 'Select an order criteria';

  enabledOrderParams: InputSignal<string> = input<string>();

  orderCriterias: InputSignal<OrderCriteria[]> = input.required<OrderCriteria[]>();
  defaultOrderCriteria: InputSignal<OrderCriteria> = input.required<OrderCriteria>();

  onOrderCriteriaChange: OutputEmitterRef<OrderCriteria> = output<OrderCriteria>();
  onClearOrderCriteria: OutputEmitterRef<boolean> = output<boolean>();

  @ViewChild("orderSelect") orderSelect: NgSelectComponent;

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      order: new FormControl(this.defaultOrderCriteria().id)
    });
  }

  public setOrderCriteria(orderCriteria: OrderCriteria | null): void {
    if (orderCriteria) {
      this.orderForm.controls['order'].setValue(orderCriteria.id);
    }
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
