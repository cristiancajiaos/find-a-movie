import { Component, OnInit, ViewChild, ChangeDetectionStrategy, InputSignal, input, OutputEmitterRef, output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-to-select',
  standalone: false,
  templateUrl: './to-select.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './to-select.scss'
})
export class ToSelect implements OnInit {

  private fb = inject(FormBuilder);
  
  public yearsToSelectForm: FormGroup;

  public toSelectLabel: string = 'To:';
  public toSelectPlaceholder: string = 'Select a year';

  public isDisabled: boolean = true;
  public selectPlaceholder: string = '';

  @ViewChild('toSelect') toSelect: NgSelectComponent;

  yearsTo: InputSignal<number[]> = input.required<number[]>();

  onSelectToYear: OutputEmitterRef<number> = output<number>();
  onClearSelectToYear: OutputEmitterRef<boolean> = output<boolean>();

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

  public enableSelect(): void {
    this.selectPlaceholder = this.toSelectPlaceholder;
    this.yearsToSelectForm.controls['toYear'].enable();
  }

  public disableSelect(): void {
    this.yearsToSelectForm.reset();
    this.yearsToSelectForm.controls['toYear'].disable();
    this.selectPlaceholder = '';
  }
}
