import { Component, ChangeDetectionStrategy, WritableSignal, signal, InputSignal, input, OutputEmitterRef, output } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-error',
  standalone: false,
  templateUrl: './search-error.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-error.scss'
})
export class SearchError {

  public repeatIcon: IconDefinition = faRepeat;

  errorMessage: InputSignal<string> = input.required<string>();
  reload: OutputEmitterRef<boolean> = output<boolean>();

  public searchErrorTitle: WritableSignal<string> = signal('Search Service Error');
  public searchErrorText: WritableSignal<string> = signal('There was an error while performing the search:');
  public reloadButtonText: WritableSignal<string> = signal('Reload');

  public pressReload(): void {
    this.reload.emit(true);
  }

}
