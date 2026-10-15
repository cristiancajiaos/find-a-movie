import { Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faCircleInfo, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-show-x-results',
  standalone: false,
  templateUrl: './show-x-results.html',
  styleUrl: './show-x-results.scss',
})
export class ShowXResults implements OnInit {

  private fb = inject(FormBuilder);

  public circleInfo: IconDefinition = faCircleInfo;

  public showResultsLabel: string = 'Results per page:';

  public showXResultsForm: FormGroup;

  @ViewChild('showResults') showResults: NgSelectComponent;

  resultsOptions: InputSignal<number[]> = input.required<number[]>();

  itemsPerPage: InputSignal<number> = input.required<number>();
  onSelectResultOption: OutputEmitterRef<number> = output<number>();

  enabledResultsParams: InputSignal<string> = input.required<string>();

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

  public setXResults(results: number) {
    this.showXResultsForm.controls['showResults'].setValue(results);
  }

  public onSelectResultOptionChange(resultsOption: number) {
    this.onSelectResultOption.emit(resultsOption);
  }
}
