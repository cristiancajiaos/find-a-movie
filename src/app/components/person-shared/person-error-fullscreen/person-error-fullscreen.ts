import { Component, ChangeDetectionStrategy, InputSignal, input, OutputEmitterRef, output, WritableSignal, signal } from '@angular/core';
import { faCircleXmark, faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-error-fullscreen',
  standalone: false,
  templateUrl: './person-error-fullscreen.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-error-fullscreen.scss'
})
export class PersonErrorFullscreen {

  public repeat: IconDefinition = faRepeat;
  public circleXIcon: IconDefinition = faCircleXmark;

  public personErrorTitle: WritableSignal<string> = signal('Person Service Error');
  public personErrorText: WritableSignal<string> = signal('There was an error trying to get person info:');
  public reloadButtonText: WritableSignal<string> = signal('Reload');

  errorMessage: InputSignal<string> = input.required<string>();
  reload: OutputEmitterRef<boolean> = output<boolean>();

  public pressReload(): void {
    this.reload.emit(true);
  }
}
