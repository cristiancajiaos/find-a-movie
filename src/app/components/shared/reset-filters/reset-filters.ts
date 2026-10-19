import { Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { faArrowRotateLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-filters',
  standalone: false,
  templateUrl: './reset-filters.html',
  styleUrl: './reset-filters.scss',
})
export class ResetFilters {

  public arrowRotateLeftIcon: IconDefinition = faArrowRotateLeft;

  public resetFiltersText: WritableSignal<string> = signal('Reset filters to default');

  public clickButton: OutputEmitterRef<boolean> = output<boolean>();

  public clickResetButton(): void {
    this.clickButton.emit(true);
  }

}
