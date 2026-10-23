import { Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faCircleInfo, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgSelectComponent } from '@ng-select/ng-select';
import { SortCriteria } from '../../../interfaces/sort-criteria';

@Component({
  selector: 'app-sort-select',
  standalone: false,
  templateUrl: './sort-select.html',
  styleUrl: './sort-select.scss',
})
export class SortSelect implements OnInit {
  private fb = inject(FormBuilder);

  public circleInfo: IconDefinition = faCircleInfo;

  public sortForm: FormGroup = new FormGroup({});

  public sortSelectLabel: string = 'Sort by:';
  public sortSelectPlaceholder: string = 'Select a sort criteria';

  enabledSortParams: InputSignal<string> = input<string>();

  sortCriterias: InputSignal<SortCriteria[]> = input.required<SortCriteria[]>();
  defaultSortCriteria: InputSignal<SortCriteria> = input.required<SortCriteria>();

  onSortCriteriaChange: OutputEmitterRef<SortCriteria>= output<SortCriteria>();
  onClearSortCriteria: OutputEmitterRef<boolean> = output<boolean>();

  @ViewChild("sortSelect") sortSelect: NgSelectComponent;

  ngOnInit(): void {
    this.sortForm = this.fb.group({
      sort: new FormControl(this.defaultSortCriteria().id)
    });
  }

  public setSortCriteria(sortCriteria: SortCriteria | null): void {
    if (sortCriteria) {
      this.sortForm.controls['sort'].setValue(sortCriteria.id);
    }
  }

  public sortCriteriaChange(sortCriteria: SortCriteria): void {
    this.onSortCriteriaChange.emit(sortCriteria);
  }

  public clearSortCriteria(): void {
    this.sortSelect.clearModel();
    this.onClearSortCriteria.emit(true);
  }

  public focusSelect(): void {
    this.sortSelect.focus();
  }

}
