import { Component, ChangeDetectionStrategy, input, output, InputSignal, OutputEmitterRef, WritableSignal, signal } from '@angular/core';
import { faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-error',
  standalone: false,
  templateUrl: './movie-error.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-error.scss'
})
export class MovieError {

  public repeat: IconDefinition = faRepeat;

  public movieErrorTitle: WritableSignal<string> = signal('Movie Service Error');
  public movieErrorText: WritableSignal<string> = signal('An error occurred when trying to get movie info:');
  public reloadButtonText: WritableSignal<string> = signal('Reload');

  errorMessage: InputSignal<string> = input.required<string>();
  reload: OutputEmitterRef<boolean> = output<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }
}
