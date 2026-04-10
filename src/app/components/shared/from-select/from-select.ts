import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-from-select',
  standalone: false,
  templateUrl: './from-select.html',
  styleUrl: './from-select.scss'
})
export class FromSelect implements OnInit {

  public yearsFromSelectForm: FormGroup;

  public placeholderFrom: string = 'Select a year';

  @ViewChild('fromSelect') fromSelect: NgSelectComponent;

  @Input() yearsFrom: number[] = [];

  @Output() onSelectFromYear: EventEmitter<number> = new EventEmitter<number>();
  @Output() onClearSelectFromYear: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.yearsFromSelectForm = this.fb.group({
      fromYear: new FormControl()
    });
  }

  public focusSelect(): void {
    this.fromSelect.focus();
  }

  public setDefaultValue() {
    this.yearsFromSelectForm.controls['fromYear'].setValue('');
  }

  public onFromYearChange(year: number): void {
    this.onSelectFromYear.emit(year);
  }

  public onClearSelect() {
    this.onClearSelectFromYear.emit(true);
  }
}
