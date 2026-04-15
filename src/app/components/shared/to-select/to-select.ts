import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-to-select',
  standalone: false,
  templateUrl: './to-select.html',
  styleUrl: './to-select.scss'
})
export class ToSelect implements OnInit {

  public yearsToSelectForm: FormGroup;

  public toSelectLabel: string = 'To:';
  public toSelectPlaceholder: string = 'Select a year';

  public isDisabled: boolean = true;

  @ViewChild('toSelect') toSelect: NgSelectComponent;

  @Input() yearsTo: number[] = [];

  @Output() onSelectToYear: EventEmitter<number> = new EventEmitter<number>();
  @Output() onClearSelectToYear: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.yearsToSelectForm = this.fb.group({
      toYear: new FormControl()
    });
    this.yearsToSelectForm.controls['toYear'].disable();
  }

  public focusSelect(): void {
    this.toSelect.focus();
  }

  public onToYearChange(year: number): void {
    this.onSelectToYear.emit(year);
  }

  public onClearSelect() {
    this.onClearSelectToYear.emit(true);
  }
}
