import { Component, ChangeDetectionStrategy, WritableSignal, signal, OutputEmitterRef, output, input, InputSignal } from '@angular/core';
import { faCircleXmark, faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-error-fullscreen',
  standalone: false,
  templateUrl: './movie-error-fullscreen.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-error-fullscreen.scss'
})
export class MovieErrorFullscreen {

  public repeat: IconDefinition = faRepeat;
  public circleXIcon: IconDefinition = faCircleXmark;

  public movieErrorTitle: WritableSignal<string> = signal('Movie Service Error');
  public movieErrorText: WritableSignal<string> = signal('An error occurred when trying to get movie info:');
  public reloadButtonText: WritableSignal<string> = signal('Reload');

  errorMessage: InputSignal<string> = input.required<string>();
  reload: OutputEmitterRef<boolean> = output<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }
}
