import { Component, OnInit, ViewChild, ChangeDetectionStrategy, InputSignal, input, OutputEmitterRef, output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-from-select',
  standalone: false,
  templateUrl: './from-select.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './from-select.scss'
})
export class FromSelect implements OnInit {

  private fb = inject(FormBuilder);

  public yearsFromSelectForm: FormGroup;

  public fromSelectLabel: string = 'From:'
  public fromSelectPlaceholder: string = 'Select a year';

  @ViewChild('fromSelect') fromSelect: NgSelectComponent;

  yearsFrom: InputSignal<number[]> = input.required<number[]>();

  onSelectFromYear: OutputEmitterRef<number> = output<number>();
  onClearSelectFromYear: OutputEmitterRef<boolean> = output<boolean>();

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
