import { Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { faCircleXmark, faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-trending-error',
  standalone: false,
  templateUrl: './home-trending-error.html',
  styleUrl: './home-trending-error.scss',
})
export class HomeTrendingError {

  public repeat: IconDefinition = faRepeat;
  public circleXIcon: IconDefinition = faCircleXmark;

  errorMessage: InputSignal<string> = input.required<string>();
  reload: OutputEmitterRef<boolean> = output<boolean>();

  public trendingErrorTitle: WritableSignal<string> = signal('Movie Service Error');
  public trendingErrorText: WritableSignal<string> = signal('An error occurred when trying to get trending movies:');
  public reloadButtonText: WritableSignal<string> = signal('Reload');

  public pressReload(): void {
    this.reload.emit(true);
  }

}
