import { Component, ChangeDetectionStrategy, WritableSignal, signal, InputSignal, input, OutputEmitterRef, output, computed } from '@angular/core';
import { faCircleXmark, faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-error-fullscreen',
  standalone: false,
  templateUrl: './search-error-fullscreen.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-error-fullscreen.scss'
})
export class SearchErrorFullscreen {

  public repeatIcon: IconDefinition = faRepeat;
  public circleXIcon: IconDefinition = faCircleXmark;

  public searchErrorTitle: WritableSignal<string> = signal('Search Service Error');

  public searchErrorText = computed(() => {
    return `An error occurred when trying to perform a search for "${this.searchQuery()}":`
  });
  public reloadButtonText: WritableSignal<string> = signal('Reload');

  errorMessage: InputSignal<string> = input.required<string>();
  searchQuery: InputSignal<string> = input.required<string>();
  reload: OutputEmitterRef<boolean> = output<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }

}
