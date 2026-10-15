import { Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-show-x-results',
  standalone: false,
  templateUrl: './show-x-results.html',
  styleUrl: './show-x-results.scss',
})
export class ShowXResults implements OnInit {

  private fb = inject(FormBuilder);

  public showResultsLabel: string = 'Results per page:';

  public showXResultsForm: FormGroup;

  @ViewChild('showResults') showResults: NgSelectComponent;

  public resultsOptions: WritableSignal<number[]> = signal([20, 40, 100]);

  itemsPerPage: InputSignal<number> = input.required<number>();
  onSelectResultOption: OutputEmitterRef<number> = output<number>();

  ngOnInit(): void {
    this.showXResultsForm = this.fb.group({
      showResults: new FormControl(this.itemsPerPage())
    });
  }

  public focusSelect(): void {
    this.showResults.focus();
  }

  public setDefaultValue(): void {
    this.showXResultsForm.controls['showResults'].setValue(this.resultsOptions()[0]);
  }

  public onSelectResultOptionChange(resultsOption: number) {
    this.onSelectResultOption.emit(resultsOption);
  }
}
